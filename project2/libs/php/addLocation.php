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
		
	$locName = $_POST['locName']; 

	// escaping content
	$locName = strip_tags($_POST['locName']);

	// filter the form input
	$locName = mysqli_real_escape_string($conn, $locName);

	$query = mysqli_query($conn,"SELECT * FROM location WHERE name='$locName'");

	$sql = "INSERT INTO location (name) VALUES ('$locName')";

	//Make sure name is valid
    if(!preg_match("/^[a-zA-Z'-]+$/", $locName)) { 
        die ("Invalid location name");
    }

	//Response
    //Checking to see if name already exists
    if(mysqli_num_rows($query) > 0) {
        echo "The location " . $locName .  " already exists.";
    }
    
    elseif(!mysqli_query($conn, $sql)) {
        echo 'Could not add location.';
    }
	
    else {
        echo "Added!";
    }
	
?>