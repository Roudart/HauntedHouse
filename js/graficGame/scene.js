var scene;
var camera;
var renderer;
var clock;
var players = [];
var keys = {};
var isWorldReady = [ false ];
var distanceCamera = 20;
var camPositions = [[-16, 22], [7, 25], [-15, 36]]
var rayCaster;
var escenario;

$(document).ready(function(){
    setupScene();

    rayCaster = new THREE.Raycaster();

    loadOBJWithMTL("assets/", "SceneMansion.obj", "SceneMansion.mtl", (object) => {
        object.rotation.y = THREE.Math.degToRad(90);
        escenario = object;
        scene.add(object);
        isWorldReady[0] = true;
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
        players[0].forward = -5;
    } else if (keys["S"]) {
        players[0].forward = 5;
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
        players[1].forward = -5;
    } else if (keys["K"]) {
        players[1].forward = 5;
    }

    if (isWorldReady[0]){
        for (let i = 0; i < players.length; i++) {
            players[i].rotation.y += players[i].yaw * deltaTime;
            players[i].translateZ(players[i].forward * deltaTime);
        }
        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < players[i].rayos.length; j++) {
                
                var rayo = players[i].rayos[j];
        
                rayCaster.set(players[i].position, rayo);
                var colisiones = rayCaster.intersectObject(escenario);
        
                if(colisiones.length > 0) {
                    console.log("hola");
                }
            }
        }
    }





    // camera.position.x = players[0].position.x;
    // camera.position.z = players[0].position.z + distanceCamera;

    renderer.render(scene, camera);
}

function setupScene() {		
    var visibleSize = { width: window.innerWidth, height: window.innerHeight};
    clock = new THREE.Clock();		
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60	, visibleSize.width / visibleSize.height, 0.1, 100);
    camera.position.y = distanceCamera
    camera.position.z = distanceCamera
    camera.rotation.x = THREE.Math.degToRad(-60)

    renderer = new THREE.WebGLRenderer( {precision: "mediump" } );
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    renderer.setSize(visibleSize.width, visibleSize.height);

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
    scene.add(ambientLight);

    var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    scene.add(grid);


	var material = new THREE.MeshLambertMaterial({color: new THREE.Color(0.8, 0.8, 0.8)});
	var geometry = new THREE.BoxGeometry(1, 1, 1);

    var player1 = new THREE.Mesh(geometry, material);
    player1.position.x = 1;
    player1.position.y = 1.8;
    var player2 = player1.clone()
    player2.position.x = -1;
    scene.add(player1);
    scene.add(player2);

    players.push(player1);
    players.push(player2);

    players[0].yaw = 0.0;
    players[0].forward = 0.0;
    players[1].yaw = 0.0;
    players[1].forward = 0.0;

    for (let i = 0; i < players.length; i++) {        
        players[i].rayos = [
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0,-1, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0,-1)
        ];
    }

    $(".bg-image").append(renderer.domElement);
}