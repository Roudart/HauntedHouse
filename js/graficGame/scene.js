var scene, camera, renderer, clock;
var players = [];
var keys = {};
var isWorldReady = [ false ];
var distanceCamera = 20;
var camPositions = [[-16, 22], [7, 25], [-15, 36]]
var rayCaster;
var mixers = [];
var actions = [];
var mixers2 = [];
var actions2 = [];
var GameInstance;
var time, timer;
var modelReady = false;;

$(document).ready(function(){
    var options = loadOptions()
    GameInstance = new GameMode(options.Mapa, options.Jugadores, options.Modo);
    setupScene();
    timer = setTimer(10);
    rayCaster = new THREE.Raycaster();

    loadOBJWithMTL("assets/", "SceneMansion.obj", "SceneMansion.mtl", (object) => {
        object.rotation.y = THREE.Math.degToRad(90);
        scene.add(object);
        isWorldReady[0] = true;
    });

    var FBXLoader = new THREE.FBXLoader();
    FBXLoader.load('obj/Anim_SoloCorrer.fbx', (personaje) => {
        personaje.mixer = new THREE.AnimationMixer(personaje);
        mixers.push(personaje.mixer);

        var action = personaje.mixer.clipAction(personaje.animations[0]);
        action.play();
        actions.push(action);

        addPlayer(personaje, 0);

        modelReady = true;
        FBXLoader.load('obj/Anim_Idle2.fbx',
            (personaAni) => {
                var action = personaje.mixer.clipAction(personaAni.animations[0]);
                action.play();
                actions.push(action);
                
                FBXLoader.load('obj/Anim_Gana.fbx',
                (personaAni) => {
                    var action = personaje.mixer.clipAction(personaAni.animations[0]);
                    action.play();
                    actions.push(action);

                    FBXLoader.load('obj/Anim_Attack3.fbx',
                    (personaAni) => {
                        var action = personaje.mixer.clipAction(personaAni.animations[0]);
                        action.play();
                        actions.push(action);

                        FBXLoader.load('obj/Anim_Pierde.fbx',
                        (personaAni) => {
                            var action = personaje.mixer.clipAction(personaAni.animations[0]);
                            action.play();
                            actions.push(action);
            
                        }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
                        (error) =>{
                            console.log(error);
                        });
        
                    }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
                    (error) =>{
                        console.log(error);
                    });
    
                }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
                (error) =>{
                    console.log(error);
                });
                

            }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
            (error) =>{
                console.log(error);
            });
    });
    var FBXLoader2 = new THREE.FBXLoader();
    FBXLoader2.load('obj/Anim_SoloCorrer2.fbx', (personaje) => {
        personaje.mixer = new THREE.AnimationMixer(personaje);
        mixers2.push(personaje.mixer);

        var action = personaje.mixer.clipAction(personaje.animations[0]);
        action.play();
        actions2.push(action);

        addPlayer(personaje, 1);
        FBXLoader.load('obj/Anim_Idle2.fbx',
            (personaAni) => {
                var action = personaje.mixer.clipAction(personaAni.animations[0]);
                action.play();
                actions2.push(action);
                
                FBXLoader.load('obj/Anim_Gana.fbx',
                (personaAni) => {
                    var action = personaje.mixer.clipAction(personaAni.animations[0]);
                    action.play();
                    actions2.push(action);

                    FBXLoader.load('obj/Anim_Attack3.fbx',
                    (personaAni) => {
                        var action = personaje.mixer.clipAction(personaAni.animations[0]);
                        action.play();
                        actions2.push(action);

                        FBXLoader.load('obj/Anim_Pierde.fbx',
                        (personaAni) => {
                            var action = personaje.mixer.clipAction(personaAni.animations[0]);
                            action.play();
                            actions2.push(action);
            
                        }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
                        (error) =>{
                            console.log(error);
                        });
        
                    }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
                    (error) =>{
                        console.log(error);
                    });
    
                }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
                (error) =>{
                    console.log(error);
                });
                

            }, (xhr) => {console.log((xhr.loaded / xhr.total) * 100 + '% loaded')}, 
            (error) =>{
                console.log(error);
            });
    });
        

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    render();
});

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(path);
    mtlLoader.load(mtlFile, (materials) => {
        
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load(objFile, (object) => {
            onLoadCallback(object);
        });
    });
}

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}


function render() {
    requestAnimationFrame(render);
    deltaTime = clock.getDelta();
if(!GameInstance.isOver()){
    if(modelReady){
        
        GameInstance.MiniGames.forEach(MiniGame => {
            MiniGame.NearMinigame(players[0].position);
        });
        // Restear las variables yaw y forward de cada jugador
        for (let i = 0; i < players.length; i++) {
            players[i].yaw = 0;
            players[i].forward = 0;
            players[i].status = "Iddle"
        }
    }
    // Player 1
    if (keys["A"]) {
        players[0].yaw = 5;
    } else if (keys["D"]) {
        players[0].yaw = -5;
    }
    if (keys["W"]) {
        players[0].status = "Moving"
        players[0].forward = 5;
    } else if (keys["S"]) {
        players[0].status = "Moving"
        players[0].forward = -5;
    }
    if ( keys["Q"]){
        players[0].status = "Attacking"
    }
    if (keys["E"] || keys["P"]){
        GameInstance.MiniGames.forEach((MiniGame, i) => {
            if( MiniGame.near ){
                scene.remove(MiniGame.mesh);
                MiniGame.completed = true;
                //OpenModal("JuegoAhorcado");
            }
        });
    }
    if (keys["2"]){
        camera.position.x = camPositions[0][0];
        camera.position.z = camPositions[0][1];
    }
    if (keys["1"]){
        camera.position.x = camPositions[1][0];
        camera.position.z = camPositions[1][1];
    }
    if (keys["3"]){
        camera.position.x = camPositions[2][0];
        camera.position.z = camPositions[2][1];
    }
    // Player 2
    if (keys["J"]) {
        players[1].yaw = 5;
    } else if (keys["L"]) {
        players[1].yaw = -5;
    }
    if (keys["I"]) {
        players[1].status = "Moving"
        players[1].forward = 5;
    } else if (keys["K"]) {
        players[1].status = "Moving"
        players[1].forward = -5;
    }
    if ( keys["O"]){
        players[1].status = "Attacking"
    }

    for (let i = 0; i < players.length; i++) {
        players[i].rotation.y += players[i].yaw * deltaTime;
        players[i].translateZ(players[i].forward * deltaTime);
    }

    
}else{
    OpenModal("Score");
    clearInterval(timer);
    for (let i = 0; i < players.length; i++) {
        if(GameInstance.GameStatus){
            players[i].status = "Win";
        }else{
            players[i].status = "Loose";
        }
        
    }
}
    if( mixers.length > 0 ){
        for (let i = 0; i < mixers.length; i++) {
            switch(players[0].status) {
                case "Moving":{
                    actions[1].stop();
                    actions[2].stop();
                    actions[3].stop();
                    actions[0].play();
                    actions[4].stop();
                    break;
                }
                case "Attacking":{
                    actions[1].stop();
                    actions[2].stop();
                    actions[0].stop();
                    actions[3].play();
                    actions[4].stop();
                    break;
                }
                case "Win":{
                    actions[1].stop();
                    actions[2].play();
                    actions[0].stop();
                    actions[3].stop();
                    actions[4].stop();
                    break;
                }
                case "Loose":{
                    actions[1].stop();
                    actions[2].stop();
                    actions[0].stop();
                    actions[3].stop();
                    actions[4].play();
                    break;
                }
                default:{
                    actions[0].stop();
                    actions[2].stop();
                    actions[1].play();
                    actions[3].stop();
                    actions[4].stop();
                    break;

                }
                
            }
            mixers[i].update( deltaTime );
        }
    }
    if( mixers2.length > 0 ){
        for ( var i = 0; i < mixers2.length; i++ ){
            switch(players[1].status) {
                case "Moving":{
                    actions2[1].stop();
                    actions2[2].stop();
                    actions2[3].stop();
                    actions2[0].play();
                    actions2[4].stop();
                    break;
                }
                case "Attacking":{
                    actions2[1].stop();
                    actions2[2].stop();
                    actions2[0].stop();
                    actions2[3].play();
                    actions2[4].stop();
                    break;
                }
                case "Win":{
                    actions2[1].stop();
                    actions2[2].play();
                    actions2[0].stop();
                    actions2[3].stop();
                    actions2[4].stop();
                    break;
                }
                case "Loose":{
                    actions2[1].stop();
                    actions2[2].stop();
                    actions2[0].stop();
                    actions2[3].stop();
                    actions2[4].play();
                    break;
                }
                default:{
                    actions2[0].stop();
                    actions2[2].stop();
                    actions2[1].play();
                    actions2[3].stop();
                    actions2[4].stop();
                    break;

                }
                
            }
            mixers2[i].update( deltaTime );
        }

    }
    

    renderer.render(scene, camera);
}

function setupScene() {		
    var visibleSize = { width: window.innerWidth, height: window.innerHeight};
    clock = new THREE.Clock();		
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60	, visibleSize.width / visibleSize.height, 0.1, 100);
    camera.position.y = distanceCamera
    camera.position.z = distanceCamera
    camera.rotation.x = THREE.Math.degToRad(-60);



    renderer = new THREE.WebGLRenderer( {precision: "mediump" } );
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    renderer.setSize(visibleSize.width, visibleSize.height);

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
    scene.add(ambientLight);

    var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    //scene.add(grid);
    var material = new THREE.MeshLambertMaterial({color: new THREE.Color(0.3, 1.0, 0.8)});
    var geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

    GameInstance.MiniGames.forEach(MiniGame => {

        var MiniGameBox = new THREE.Mesh(geometry, material)
        MiniGameBox.position.x = MiniGame.posX;
        MiniGameBox.position.y = MiniGame.posY;
        MiniGameBox.position.z = MiniGame.posZ;
        MiniGame.mesh = MiniGameBox;
        scene.add(MiniGameBox);
    });

    $(".bg-image").append(renderer.domElement);
}

function addPlayer(monito, id){
    var material = new THREE.MeshLambertMaterial({color: new THREE.Color(0.5, 0.0, 0.0)});
	var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);

	var player = new THREE.Mesh(geometry, material)
    players.push(player);
    scene.add(players[id])
    players[id].yaw = 0;
    players[id].forward = 0;
    players[id].status = "Iddle";
    players[id].position.z += 4;
    players[id].position.x += id;
            
    scene.add(monito);
    players[id].add(monito);
}

function setTimer(minutes){
    // Set the date we're counting down to
    var countDownDate = new Date().getTime() + (minutes * 1000 * 60);

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    time = minutes + "m " + seconds + "s "
    document.getElementById("demo").innerHTML = time;

    // If the count down is finished, write some text
    if (distance < 0) {
        GameInstance.GameStatus = false;
        document.getElementById("demo").innerHTML = "You Loose!";
    }
    }, 1000);
    return x;
}

function loadOptions(){
    var aux = localStorage.getItem("Opciones");
    if (aux == null){
        aux = {"Mapa": 1, "Jugadores": 1, "Modo": 1};
    }else{
        aux = JSON.parse(aux);
    }
    console.log(aux.Mapa);
    console.log(aux.Jugadores);
    console.log(aux.Modo);
    return aux;
}