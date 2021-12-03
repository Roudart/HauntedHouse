function getRndInteger(min, max) { // Obtiene un valor entero entre el rango de numeros que se de
    return Math.floor(Math.random() * (max - min) ) + min;
}

class GameMode{
    GameOver = false;
    GameStatus = true;
    MiniGames = [];
    Enemy = [];
    doorKey = []
    BoxCollitions = [];
    currentRoom;
    vidas = 3;
    hab1Pos = [ [-2.6, 1, 6], [6, 1, 2.5],              // POSICION 0
                [12, 1, 3],[16.5, 1, 3],                // POSICION 1 ... etc
                [15.5, 1, 13.3], [16.5, 1 ,10.5],
                [-2.3, 1, 20.3],[-0.8, 1, 17.5],
                [14.4, 1, 20.5],[16.2, 1, 18.3],
                [1.5, -0.5, 13], [2.7, -0.5, 8,1],
                [11.7, -0.5, 14], [12.5, -0.5, 10.8],
                [6, -0.5, 13.7], [7.7, -0.5, 11.7]];    // POSICION 7!
    hab2Pos = [ [-23.5, 1, 18.2], [-13, 1,18.3] ,       // POSICION 0
                [-23.5, 1, 16.5], [-10.8, 1, 16.3],     // POSICION 1 ... etc
                [-23.7, 1, 14.7], [-20.1, 1, 14],
                [-16.6, 1.3, 13],   [-15.4, 1.3, 10.6],
                [-19.3, 1, 7.1],   [-12.7, 1, 7.3],
                [-7.2, 1.5, 8.6], [-5, 1.5, 7.3],
                [-26.5, 1.5, 9],  [-26.6, 1.5, 6.6],
                [-5, 1.5, 17.4],  [-4.8, 1.5, 14.7],
                [-25.3, 3.0, 5.8],[-24.6, 3.0, 3.0],
                [-21.3, 3.0, 2.9],[-20.6, 3.0, 2.25],
                [-17.4, 3.0, 3.4],[-14.6, 3.0, 1.7],
                [-19.5, 3.0, 0],  [-18.5, 3.0, -1.5],
                [-16.8, 3.0, -1.1],[-13.8, 3.0, -1.3],
                [-5.2, 3.0, 5.3], [-5, 3.0, 2.4]];       // POSICION 13!
    hab3Pos = [ [-13.2, 1, 24.3], [-12.8, 1, 23.9],
                [-19.6, 1.5, 28.7], [-19, 1.5, 27.7],
                [-19.4, 1.5, 26], [-19, 1.5, 25],
                [-13.2, 1, 25.9], [-12.7, 1, 25.1],
                [-16.6, 2.5, 27.7], [-15.4, 2.5, 26]];   // POSICION 4
    RoomCollitions =   [[-3.5, 22.5], [-2.5, 13],
                        [-3.5, 11.5], [-2.5, 2],
                        [-2.5, 3], [17.3, 1.5],
                        [16.5, 21.8], [18, 3],
                        [-3, 22.5], [16.5, 20.8],
                        [0.7, 18.1], [1.3, 5.9],
                        [0.7, 18.3], [5.4, 17.7],
                        [8.7, 18.3], [13, 17.7],
                        [12.8, 18.3], [13.3, 6],
                        [0.7, 6.3], [5.3, 5.5],
                        [8.6, 6.3], [13.3, 5.5]];
    constructor( habitacion, numJugadores, mode, ) {
        this.room = habitacion;
        this.currentRoom = habitacion;
        console.log(this.currentRoom);
        this.objects = 3;
        this.mode = mode;
        this.numPlayers = numJugadores; 
        this.GetMinigames();
        this.getCurrentRoom();
        this.GetRoomCollitions();
    }

    CreateRoomKeys(keyMesh){
        switch(this.room){
            case 1:
                for (let i = 0; i < 3; i++) {this.doorKey.push(keyMesh);}
                break;
            case 2:
                for (let i = 0; i < 2; i++) {this.doorKey.push(keyMesh);}
                break;
            case 3:
                for (let i = 0; i < 1; i++) {this.doorKey.push(keyMesh);}
                break;
            default:
                break;
        }
    }

    addEnemy(object, numberOfEnemies){
        for (let i = 0; i < numberOfEnemies; i++) {
            this.Enemy.push(new Enemy(cloneFBX(object)));
        }
    }

    checkBox(MiniGame){
        MiniGame.completed = true;
        for (let i = 0; i < MiniGames.length; i++) {
            
        }
    }

    spawnKey(scene, index){
        scene.add(this.doorKey[index]);
    }

    GetMinigames(){
        for (let i = 0; i < this.objects; i++) {
            if(this.room < 2)
            this.MiniGames.push( new MiniGame ( this.GetMiniGameRandomPos(1) ,1, [0,0,1])); // AZUL   HAB1
            if(this.room < 3)
            this.MiniGames.push( new MiniGame ( this.GetMiniGameRandomPos(2) ,1, [1,0,0]));  // ROJO  HAB2
            this.MiniGames.push( new MiniGame ( this.GetMiniGameRandomPos(3) ,1, [0,1,0]));  // VERDE HAB3
        }
    }

    GetRoomCollitions(){
        if (this.RoomCollitions.length > 0){
            for (let i = 0; i < (this.RoomCollitions.length / 2); i++) {
                this.BoxCollitions.push( new BoxCollition ( this.RoomCollitions[i * 2][0], this.RoomCollitions[i*2][1],
                                                            this.RoomCollitions[(i * 2) + 1][0], this.RoomCollitions[(i * 2) + 1][1]))
            }
        }
    }

    getCurrentRoom(){
        if(this.room == 1){
            this.camPosX = 0; 
            this.camPosZ = 12; 
            this.camPosY = 18; 
        }
        if(this.room == 2){
            this.camPosX = -8; 
            this.camPosZ = 10; 
            this.camPosY = 24; 
        }
        if(this.room == 3){
            this.camPosX = -16; 
            this.camPosZ = 27; 
            this.camPosY = 8.5; 
        }
    }

    updateEnemy(deltaTime, players){
        for (let i = 0; i < this.Enemy.length; i++) {
            this.Enemy[i].update(deltaTime, players, this);
        }
        if(this.vidas == 0){
            this.GameOver = true;
            this.GameStatus = false;
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
                var posicion = Math.floor(Math.random() * 7);
                posicion = posicion * 2;
                var posX = getRndInteger(this.hab1Pos[posicion][0], this.hab1Pos[posicion + 1][0]);
                var posY = this.hab1Pos[posicion][1];
                var posZ = getRndInteger(this.hab1Pos[posicion][2], this.hab1Pos[posicion + 1][2]);
                return [posX, posY, posZ];
            }
            case 2: {
                var posicion = Math.floor(Math.random() * 13);
                posicion = posicion * 2;
                var posX = getRndInteger(this.hab2Pos[posicion][0], this.hab2Pos[posicion + 1][0]);
                var posY = this.hab2Pos[posicion][1];
                var posZ = getRndInteger(this.hab2Pos[posicion][2], this.hab2Pos[posicion + 1][2]);
                return [posX, posY, posZ];
            }
            case 3: {
                var posicion = Math.floor(Math.random() * 4);
                posicion = posicion * 2;
                var posX = getRndInteger(this.hab3Pos[posicion][0], this.hab3Pos[posicion + 1][0]);
                var posY = this.hab3Pos[posicion][1];
                var posZ = getRndInteger(this.hab3Pos[posicion][2], this.hab3Pos[posicion + 1][2]);
                return [posX, posY, posZ];
            }
            default:{
                return [0,0,0];
            }
        }
    }

    saveScore(time, Usuario){
        var dataToSend = {
            action : "saveScore",
            id : Usuario.IdUsuario,
            score : time
        };

        $.ajax({
            url : "webService/UsuarioDB.php",
            async: true,
            type : 'POST',
            data : dataToSend,
            success : function(data){
                console.log(time)
                var dataToSend = {
                    action : "getScores"
                };
                $.ajax({
                    url : "webService/UsuarioDB.php",
                    async: true,
                    type : 'POST',
                    data : dataToSend,
                    success : function(dataScore){
                        console.log(dataScore);
                        var Scores = JSON.parse(dataScore)
                        OpenModal("Score", Scores);
                    },
                    failure : function(){
                        alert("Algo salió mal");
                    }
                });
            },
            failure : function(){
                alert("Algo salió mal");
            }
        });
    }
}

class MiniGame{
    collisionDistance = 2;
    completed = false;
    near = false;
    mesh;
    isOpen = false;
    constructor( position, Type, material) {
        this.posX = position[0];
        this.posY = position[1];
        this.posZ = position[2];
        this.Type = Type;
        this.Material = material;
    }

    AnimateMesh(){
        this.mesh.rotation.y += THREE.Math.degToRad(1);
    }

    NearMinigame(posPlayer){
        this.AnimateMesh();
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

    OpenMiniGame(){
        this.isOpen = true;
        this.modal = document.getElementById("JuegoAhorcado");
        modal.style.display = "block";
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    }
    CloseMiniGame(){
        this.isOpen = false;

    }

}

class BoxCollition{
    constructor(X1, Y1, X2, Y2){ // X1 < X2 | Y1 < Y2
        this.X1 = X1;
        this.Y1 = Y1;
        this.X2 = X2;
        this.Y2 = Y2;
    }

    isColliding(pos){ // (X1 < posX < X2 && Y1 < posY < Y2) = TRUE
        var posX = pos.x; 
        var posY = pos.z; 
        if (this.X1 < posX &&
            posX < this.X2 &&
            this.Y2 < posY &&
            posY < this.Y1){ 
            // Colisiona!
            //console.log("está tocando");
            return true;
        }else{ 
            // No colisiona!
            return false;
        }
    }
}

class RoundCollition{
    constructor(X0, Y0, r){
        this.X0 = X0;
        this.Y0 = Y0;
        this.r = r;
    }

    setPosition(position){
        this.X0 = position[0];
        this.Y0 = position[1];
    }
    isColliding(players){
        if (players){
            for (let i = 0; i < players.length; i++) {
                    var distance = Math.sqrt(( (this.X0-players[i].position.x)*(this.X0-players[i].position.x) ) + ( (this.Y0-players[i].position.z)*(this.Y0-players[i].position.z) )); 
                    if(distance < this.r) {return true;}
                    return false;
            }
        }
    }
}

class Enemy{
    collition;
    attackDistance = 2;
    isAtacking;
    created;
    rotationRate = -30;
    rotationAngle;
    currentRotation;
    nextRotation;
    currentPatrol;
    nextPatrol;
    isMoving;
    speed;
    animation;
    attackAnimation;
    attackTime;


    hooverPlus = 0;
    mixer = [];

    patrolRoom;
    patrolRoom1 = [
        [15, 0, 5],
        [15, 0, 20],
        [0, 0, 20],
        [0, 0, 5]
    ];
    patrolRoom2 = [
        [-6, 0, 10],
        [-6, 0, 20],
        [-26, 0, 20],
        [-26, 0, 10]
    ];
    patrolRoom3 = [
        [-13, 0, 24],
        [-13, 0, 30],
        [-18, 0, 30],
        [-18, 0, 24]
    ];
    constructor(mesh){
        this.mesh = mesh;
        this.created = false;
    }

    spawnEnemy1(scene, patrol, rotation, patrolRoom, currentRoom){
        if(!this.created){
            switch(patrolRoom){
                case 1:
                    this.patrolRoom = this.patrolRoom1;
                    this.mesh.position.x = this.patrolRoom1[patrol][0];
                    this.mesh.position.y = this.patrolRoom1[patrol][1];
                    this.mesh.position.z = this.patrolRoom1[patrol][2];
                    break;
                case 2:
                    this.patrolRoom = this.patrolRoom2;
                    this.mesh.position.x = this.patrolRoom2[patrol][0];
                    this.mesh.position.y = this.patrolRoom2[patrol][1];
                    this.mesh.position.z = this.patrolRoom2[patrol][2];
                    break;
                case 3:
                    this.patrolRoom = this.patrolRoom3;
                    this.mesh.position.x = this.patrolRoom3[patrol][0];
                    this.mesh.position.y = this.patrolRoom3[patrol][1];
                    this.mesh.position.z = this.patrolRoom3[patrol][2];
                    break;
            }
            this.currentPatrol = patrol;
            this.mesh.rotation.y = rotation;
            this.currentRotation = 0;
            this.nextRotation = 0;
            this.rotationAngle = -90;
            this.speed = 0.1;
            this.isMoving = true;
            this.attackAnimation = 0;
            this.attackTime = 8;
            this.isAtacking = false;
            scene.add(this.mesh);
            this.collition = new RoundCollition(this.mesh.position.x, this.mesh.position.y, this.attackDistance);
            this.created = true;
        }
    }
    
    deleteEnemy(scene){
        scene.remove(mesh);
    }
    
    rotate(deltaTime){
        this.mesh.rotation.y += THREE.Math.degToRad(this.rotationRate * deltaTime);
        this.currentRotation += this.rotationRate * deltaTime;
        if(Math.floor(this.currentRotation) == this.nextRotation){
            console.log("terminamos de rotar");
            this.currentRotation = Math.floor(this.currentRotation);
            console.log(this.currentRotation);
            this.mesh.rotation.y = THREE.Math.degToRad(this.currentRotation);
            this.mesh.position.x = Math.round(this.mesh.position.x);
            this.mesh.position.z = Math.round(this.mesh.position.z);
            this.currentPatrol = this.currentPatrol + 1;
            if(this.currentPatrol == this.patrolRoom.length) this.currentPatrol = 0;
            this.isMoving = true;
        }
    }
    rotateTo(angle){
        this.nextRotation = angle;
        this.isMoving = false;
    }

    update(deltaTime, players, juego){
        this.updateAnimation(deltaTime);
        this.updateCollition();
        if(!this.isAtacking){
            if(this.isMoving){
                this.move(deltaTime, players);
            }else{
                this.rotate(deltaTime);
            }
        }else{
            this.attack(deltaTime, players, juego);
        }
    }

    attack(deltaTime, players, juego){
        this.attackAnimation += 1 * deltaTime;
        if(this.attackAnimation > this.attackTime){
            if(this.collition.isColliding(players)){
                this.dealDamage(players, juego);
            }
            this.isAtacking = false;
            this.attackAnimation = 0;
        }
    }

    updateCollition(){
        var position = [this.mesh.position.x, this.mesh.position.z];
        this.collition.setPosition(position);
        if(this.collition.isColliding(players)){this.isAtacking = true;}
    }

    updateAnimation(deltaTime){
        this.hooverPlus += 1 * deltaTime;
        this.mesh.position.y = Math.cos(this.hooverPlus) / 3;
    }

    move(deltaTime){
        for (let i = 0; i < this.patrolRoom.length; i++) {
            var nextPatrol = this.currentPatrol + 1;
            if(nextPatrol == this.patrolRoom.length) nextPatrol = 0;
            this.moveTo(nextPatrol, deltaTime);
        }
    }

    moveTo(nextPatrol, deltaTime){
        var xTo = this.patrolRoom[nextPatrol][0];
        var zTo = this.patrolRoom[nextPatrol][2];
        var xFrom = this.mesh.position.x.toFixed(2);
        var zFrom = this.mesh.position.z.toFixed(2);
        if (xTo == xFrom && zTo == zFrom){
            // Llego al destino
            // console.log("Llegue!");
            this.rotateTo(this.currentRotation + this.rotationAngle);
        }else{
            this.mesh.translateZ(deltaTime * this.speed);
        }
    }

    dealDamage(players, juego){
        for (let i = 0; i < players.length; i++) {
            juego.vidas -= 1;
            console.log("-1 Corazon");
            console.log(juego.vidas);
        }
    }
}

class Position{
    constructor(x, z){
        this.X = x;
        this.Z = z;
    }
}

function cloneFBX(fbx){
    const clone = fbx.clone(true)
        clone.animations = fbx.animations
        clone.skeleton = { bones: [] }
    
        const skinnedMeshes = {}
    
        fbx.traverse(node => {
            if (node.isSkinnedMesh) {
                skinnedMeshes[node.name] = node
            }
        })
    
        const cloneBones = {}
        const cloneSkinnedMeshes = {}
    
        clone.traverse(node => {
            if (node.isBone) {
                cloneBones[node.name] = node
            }
    
            if (node.isSkinnedMesh) {
                cloneSkinnedMeshes[node.name] = node
            }
        })
    
        for (let name in skinnedMeshes) {
            const skinnedMesh = skinnedMeshes[name]
            const skeleton = skinnedMesh.skeleton
            const cloneSkinnedMesh = cloneSkinnedMeshes[name]
    
            const orderedCloneBones = []
    
            for (let i=0; i<skeleton.bones.length; i++) {
                const cloneBone = cloneBones[skeleton.bones[i].name]
                orderedCloneBones.push(cloneBone)
            }
    
            cloneSkinnedMesh.bind(
                new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
                cloneSkinnedMesh.matrixWorld)
    
            // For animation to work correctly:
            clone.skeleton.bones.push(cloneSkinnedMesh)
            clone.skeleton.bones.push(...orderedCloneBones)
        }
    
        return clone
}