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

	$dept = $_POST['dept'];
	$loc = $_POST['loc'];
	$id = $_POST['id'];
	
	// escaping content
	$dept = strip_tags($_POST['dept']); 

	// filter the form input
	$dept = mysqli_real_escape_string($conn, $dept);
	
	$sql = "UPDATE department 
	SET name = '$dept', locationID = '$loc'
	WHERE id = '$id'";

	if(!preg_match("/^[a-zA-Z- ]+$/", $dept)) { 
		die ("Invalid department name.");
	}

	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not edit department.';
    }
	
    else {
        echo "Edited!";
    }
	
?>