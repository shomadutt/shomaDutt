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

	$firstName = $_POST['firstName']; 
	$lastName = $_POST['lastName'];
	$jobTitle = $_POST['jobTitle'];

	if(strlen($_POST['jobTitle']) > 0) {
		$jobTitle = $_POST['jobTitle'];
	} else {
		$jobTitle = "";
	}
	
	$email = $_POST['email'];
	$dept = $_POST['dept'];
	$id = $_POST['id'];
	
	// escaping content
	$firstName = strip_tags($_POST['firstName']); 
	$lastName = strip_tags($_POST['lastName']); 
	$jobTitle = strip_tags($_POST['jobTitle']);
	$email = strip_tags($_POST['email']);

	// filter the form input
	$firstName = mysqli_real_escape_string($conn, $firstName);
	$lastName = mysqli_real_escape_string($conn, $lastName);
	$jobTitle = mysqli_real_escape_string($conn, $jobTitle);
	$email = mysqli_real_escape_string($conn, $email);
	
	$sql = "UPDATE personnel 
	SET firstName = '$firstName', lastName = '$lastName', jobTitle = '$jobTitle', 
		email = '$email', departmentID = '$dept'
	WHERE id = '$id'";

	if(!preg_match("/^[a-zA-Z-]+$/", $firstName)) { 
		die ("Invalid first name.");
	}

	if(!preg_match("/^[a-zA-Z-]+$/", $lastName)) { 
		die ("Invalid last name.");
	}
		
	if($jobTitle !== "") {
		if(!preg_match("/^[a-zA-Z- ]+$/", $jobTitle)) { 
			die ("Invalid job title.");
		}
	}
	
	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not edit employee.';
    }
	
    else {
        echo "Edited!";
    }
	
?>