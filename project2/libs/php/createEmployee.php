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

	if(strlen($_POST['jobTitle']) > 0) {
		$jobTitle = $_POST['jobTitle'];
	} else {
		$jobTitle = "";
	}
	
	$email = $_POST['email'];
	$dept = $_POST['dept'];
	
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

	$sql = "INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) 
			VALUES ('$firstName', '$lastName', '$jobTitle', '$email', '$dept')";
			
    if(!preg_match("/^[a-zA-Z- ]+$/", $firstName)) { 
        die ("Invalid first name.");
    }

	if(!preg_match("/^[a-zA-Z-']+$/", $lastName)) { 
        die ("Invalid last name.");
    }

	if($jobTitle !== "") {
		if(!preg_match("/^[a-zA-Z- ]+$/", $jobTitle)) { 
			die ("Invalid job title.");
		}
	}

	if(!preg_match("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/", $email)) { 
        die ("Invalid email address.");
    }

	if(empty($dept)) { 
        die ("Please select a department.");
    }

	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not create employee.';
    }
	
    else {
        echo "Added!";
    }
	
?>