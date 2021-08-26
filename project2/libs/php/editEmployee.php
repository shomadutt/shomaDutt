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

	//Make sure job title is valid
	if(strlen($_POST['jobTitle'] > 0)) {
    	if(!preg_match("/^[a-zA-Z' ]+$/", $_POST['jobTitle'])) { 
        die ("Invalid job title.");
		}
    }
	
	$sql = "";

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

	if (isset($_POST['dept'])){
		$dept = strip_tags($_POST['dept']);
		$dept = mysqli_real_escape_string($conn, $dept);
		}else{
			$dept = $_POST['dept'];
	}

	$sql = "UPDATE personnel 
	SET jobTitle = '$jobTitle', email = '$email', departmentID = '$dept'
	WHERE firstName = '$firstName' 
	AND lastName = '$lastName'";

	//Response
    
    if(!mysqli_query($conn, $sql)) {
        echo 'Could not edit employee.';
    }
	
    else {
        echo "Edited!";
    }
	
?>