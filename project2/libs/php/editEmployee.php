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

	//Make sure first name is valid
	if(strlen($_POST['firstName'] > 0)) {
    	if(!preg_match("/^[a-zA-Z' ]+$/", $_POST['firstName'])) { 
        die ("Invalid first name.");
		}
    }

	//Make sure last name is valid
	if(strlen($_POST['firstName'] > 0)) {
    	if(!preg_match("/^[a-zA-Z' ]+$/", $_POST['firstName'])) { 
        die ("Invalid first name.");
		}
    }

	//Make sure job title is valid
	if(strlen($_POST['jobTitle'] > 0)) {
    	if(!preg_match("/^[a-zA-Z' ]+$/", $_POST['jobTitle'])) { 
        die ("Invalid jobTitle.");
		}
    }
	
	$sql = "";

	if (isset($_POST['firstName'])){
		$firstName = strip_tags($_POST['firstName']);
		$firstName = mysqli_real_escape_string($conn, $firstName);
		}else{
			$firstName = NULL;
	}

	if (isset($_POST['lastName'])){
		$lastName = strip_tags($_POST['lastName']);
		$lastName = mysqli_real_escape_string($conn, $lastName);
		}else{
			$lastName = NULL;
	}

	if (isset($_POST['jobTitle'])){
		$jobTitle = strip_tags($_POST['jobTitle']);
		$jobTitle = mysqli_real_escape_string($conn, $jobTitle);
		}else{
			$jobTitle = NULL;
	}
			
	if (isset($_POST['email'])){
		$email = strip_tags($_POST['email']);
		$email = mysqli_real_escape_string($conn, $email);
		}else{
			$email = NULL;
	}

	$dept = $_POST['dept'];
	
	$sql = "UPDATE personnel 
	SET firstName = '$firstName', lastName = '$lastName', jobTitle = '$jobTitle', 
		email = '$email', departmentID = '$dept'
	WHERE id = '$id'";

	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not edit employee.';
    }
	
    else {
        echo "Edited!";
    }
	
?>