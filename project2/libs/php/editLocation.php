<?php
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	if(!mysqli_select_db($conn, 'companydirectory')) {
        echo 'Database Not Selected';
    }

	$id = $_POST['id'];
	$locName = $_POST['locName'];

	
	// escaping content
	$locName = strip_tags($_POST['locName']); 

	// filter the form input
	$locName = mysqli_real_escape_string($conn, $locName);
	
	$sql = "UPDATE location 
	SET name = '$locName'
	WHERE id = '$id'";

	if(!preg_match("/^[a-zA-Z- ]+$/", $locName)) { 
		die ("Invalid location name.");
	}

	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not edit location.';
    }
	
    else {
        echo "Edited!";
    }
	
?>