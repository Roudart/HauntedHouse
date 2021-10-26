function getRndInteger(min, max) { // Obtiene un valor entero entre el rango de numeros que se de
    return Math.floor(Math.random() * (max - min) ) + min;
}

class GameMode{
    GameOver = false;
    GameStatus = true;
    MiniGames = [];
    hab1Pos = [ [-20,30], [-12, 23] ];
    hab2Pos = [ [-28, 21], [-4, -2] ];
    hab3Pos = [ [-2, 21], [16, 21] ];
    constructor( habitacion, numJugadores, mode, ) {
        this.room = habitacion;
        this.objects = habitacion;
        this.mode = mode;
        this.numPlayers = numJugadores; 
        this.GetMinigames();
    }

    GetMinigames(){
        for (let i = 0; i < this.objects; i++) {
            this.MiniGames.push( new MiniGame ( this.GetMiniGameRandomPos(1) ,1 ));
        }
        for (let i = 0; i < this.objects; i++) {
            this.MiniGames.push( new MiniGame ( this.GetMiniGameRandomPos(2) ,1 ));
        }
        for (let i = 0; i < this.objects; i++) {
            this.MiniGames.push( new MiniGame ( this.GetMiniGameRandomPos(3) ,1 ));
        }
    }

    isOver() {
        if(this.GameStatus){
            for (let i = 0; i < this.MiniGames.length; i++) {
                if(this.MiniGames[i].completed){
                    this.GameOver = true;
                    continue;
                }else{
                    this.GameOver = false;
                    return this.GameOver;
                }
            }
            return this.GameOver;
        }
        else {
            return true;
        }
    }

    GetMiniGameRandomPos(room){
        switch(room){
            case 1: {
                var posX = getRndInteger(this.hab1Pos[0][0], this.hab1Pos[1][0]);
                var posZ = getRndInteger(this.hab1Pos[0][1], this.hab1Pos[1][1]);
                return [posX, posZ];
            }
            case 2: {
                var posX = getRndInteger(this.hab2Pos[0][0], this.hab2Pos[1][0]);
                var posZ = getRndInteger(this.hab2Pos[0][1], this.hab2Pos[1][1]);
                return [posX, posZ];
            }
            case 3: {
                var posX = getRndInteger(this.hab3Pos[0][0], this.hab3Pos[1][0]);
                var posZ = getRndInteger(this.hab3Pos[0][1], this.hab3Pos[1][1]);
                return [posX, posZ];
            }
            default:{
                return [0,0];
            }
        }
    }

    setGameOver(time){
        if(!this.GameOver){
            shareScore(time);
            this.GameOver = true;
        }
    }
}

class MiniGame{
    collisionDistance = 2;
    height = 3;
    completed = false;
    near = false;
    mesh;
    constructor( position, Type) {
        this.posX = position[0];
        this.posY = this.height;
        this.posZ = position[1];
        this.Type = Type;
    }

    NearMinigame(posPlayer){
        if ( !this.completed) {
            var X1 = posPlayer.x
            var Y1 = posPlayer.z
            var X2 = this.posX;
            var Y2 = this.posZ;
            if( this.Collision (X1, X2, Y1, Y2) ){
                this.near = true;
            }else{
                this.near = false;
            }
        }
        return false;
    }

    Collision(X1, X2, Y1, Y2) {
        var distance = Math.sqrt( ( (X2 - X1) * (X2 - X1) ) + ( (Y2 - Y1) * (Y2 - Y1) ) );
        if (distance < this.collisionDistance) {
            return true;
        } else return false;
    }

}