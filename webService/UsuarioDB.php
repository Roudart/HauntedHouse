<?php
    $action = $_POST['action'];
    if ($action == "addUser") 
        addUser();
    else if ($action == "getUser")
        getUser();
	else if ($action == "findUser")
		findUser();
	else if ($action == "saveScore")
		saveScore();
	else if ($action == "getScores")
		getScores();
    function connect() {
        $databasehost = "localhost"; // Nombre de instancia o host de la base de datos
        $databasename = "HauntedHouseDB"; // Nombre de schema o DB
        $databaseuser = "root"; // Usuario con el que ingresas
        $databasepass = "2dumb2live"; //Contraseña del host
    
        $mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
        if ($mysqli->connect_errno) {
            echo "Problema con la conexion a la base de datos";
        }
        return $mysqli;
    }

    function disconnect($mysqli) {
		mysqli_close($mysqli);
	}

	function addUser() {
		$name = $_POST["name"];
		$password = $_POST["password"];

		$mysqli = connect();
		
		$result = $mysqli->query("CALL CrearUsuario('$name','$password');");
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";		
		}
		disconnect($mysqli);
	}

	function getUser() {
		$name = $_POST["name"];
		$password = $_POST["password"];

		$mysqli = connect();

		$result = $mysqli->query("CALL VerificarUsuario('$name', '$password');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			// Recorremos los resultados devueltos
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows = $r;
			}
			// Codificamos los resultados a formato JSON y lo enviamos al HTML (Client-Side)
			echo json_encode($rows);
		}
		disconnect($mysqli);		
	}
	
	function findUser() {
		$name = $_POST["name"];

		$mysqli = connect();
		
		$result = $mysqli->query("CALL ExisteUsuario('$name');");

		if(!$result){
			echo "Problema al hacer un query: " . $mysqli->error;
		}else{
			$rows = array();
			while( $r = $result->fetch_assoc()){
				$rows = $r;
			}
			echo json_encode($rows);
		}

		disconnect($mysqli);
	}

	function saveScore() {
		$id = $_POST["id"];
		$score = $_POST["score"];

		$mysqli = connect();
		
		$result = $mysqli->query("CALL ActualizarPuntaje('$id', '$score');");

		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";		
		}

		disconnect($mysqli);
	}

	function getScores() {

		$mysqli = connect();
		
		$result = $mysqli->query("CALL ObtenerPuntajes();");

		if(!$result){
			echo "Problema al hacer un query: " . $mysqli->error;
		}else{
			$rows = array();
			$i = 0;
			while( $r = $result->fetch_assoc()){
				$rows[$i] = $r;
				$i++;
			}
			echo json_encode($rows);
		}

		disconnect($mysqli);
	}
?>