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
		
	$deptName = $_POST['deptName']; 
	$addDeptLoc = $_POST['addDeptLoc']; 

	// escaping content
	$deptName = strip_tags($_POST['deptName']);

	// filter the form input
	$deptName = mysqli_real_escape_string($conn, $deptName);

	$sql = "INSERT INTO department (name, locationID) VALUES ('$deptName', '$addDeptLoc')";

	//Make sure name is valid
    if(!preg_match("/^[a-zA-Z-]+$/", $deptName)) { 
        die ("Invalid department name");
    }

	if(empty($addDeptLoc)) { 
        die ("Please select a location.");
    }

	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not add department.';
    }
	
    else {
        echo "Added!";
    }
	
?>