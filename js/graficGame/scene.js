var scene;
var camera;
var renderer;
var clock;
var players = [];
var keys = {};
var isWorldReady = [ false ];
var distanceCamera = 25;
var camPositions = [[-16, 22], [7, 25], [-15, 36]]
var rayCaster;
var escenario;
var mixers = [];
var mixers2 = [];
var monito;
var objs = [];

$(document).ready(function(){
    setupScene();
    setTimer(10);

    rayCaster = new THREE.Raycaster();

    loadOBJWithMTL("assets/", "SceneMansion.obj", "SceneMansion.mtl", (object) => {
        object.rotation.y = THREE.Math.degToRad(90);
        escenario = object;
        scene.add(object);
        isWorldReady[0] = true;
    });

    var FBXLoader = new THREE.FBXLoader();
    FBXLoader.load('obj/LilGirl_Ani.fbx', (personaje) => {
        personaje.mixer = new THREE.AnimationMixer(personaje);
        mixers.push(personaje.mixer);

        var action = personaje.mixer.clipAction(personaje.animations[0]);
        action.play();

        addPlayer(personaje, 0);});
    FBXLoader.load('obj/LilGirl_Ani2.fbx', (personaje) => {
        personaje.mixer = new THREE.AnimationMixer(personaje);
        mixers.push(personaje.mixer);

        var action = personaje.mixer.clipAction(personaje.animations[0]);
        action.play();

        addPlayer(personaje, 1);});
        

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
    if( mixers.length > 0 ){
        for ( var i = 0; i < mixers.length; i++ ){
            mixers[i].update( deltaTime );

        }

    }

    // Restear las variables yaw y forward de cada jugador
    for (let i = 0; i < players.length; i++) {
        players[i].yaw = 0;
        players[i].forward = 0;
    }
    // Player 1
    if (keys["A"]) {
        players[0].yaw = 5;
    } else if (keys["D"]) {
        players[0].yaw = -5;
    }
    if (keys["W"]) {
        players[0].forward = 5;
    } else if (keys["S"]) {
        players[0].forward = -5;
    }
    if (keys["Q"]){
        console.log(camera.position)
    }
    if (keys["1"]){
        camera.position.x = camPositions[0][0];
        camera.position.z = camPositions[0][1];
    }
    if (keys["2"]){
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
        players[1].forward = 5;
    } else if (keys["K"]) {
        players[1].forward = -5;
    }


    for (let i = 0; i < players.length; i++) {
        players[i].rotation.y += players[i].yaw * deltaTime;
        players[i].translateZ(players[i].forward * deltaTime);
    }


    // camera.position.x = players[0].position.x;
    // camera.position.z = players[0].position.z;

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
    scene.add(grid);



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

    document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
    }, 1000);
}