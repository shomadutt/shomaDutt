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

	$firstName = $_POST['firstName']; 
	$lastName = $_POST['lastName']; 
	$jobTitle = $_POST['jobTitle']; 
	$email = $_POST['email']; 
	$dName = $_POST['department']; 
	$lName = $_POST['location']; 

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

	$query = "";

	if(strlen($firstName > 0)) {
		$query = "";
		$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
		FROM personnel p 
		LEFT JOIN department d ON (d.id = p.departmentID) 
		LEFT JOIN location l ON (l.id = d.locationID) 
		WHERE p.firstName LIKE '%$firstName%'";

		if(strlen($lastName) > 0) {
			$query .= "AND p.lastName LIKE '%$lastName%'";
		}	

		if(strlen($jobTitle) > 0) {
			$query .= "AND p.jobTitle LIKE '%$jobTitle%'";
		}

		if(strlen($email) > 0) {
			$query .= "AND p.email LIKE '%$email%'";
		}	

		if(strlen($dName) > 0) {
			$query .= "AND d.name = '$dName'";
		}	

		if(strlen($lName) > 0) {
			$query .= "AND l.name = '$lName'";
		}	
	} 
	
	else if(strlen($lastName) > 0) {
		$query = "";
		$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
		FROM personnel p 
		LEFT JOIN department d ON (d.id = p.departmentID) 
		LEFT JOIN location l ON (l.id = d.locationID) 
		WHERE p.lastName LIKE '%$lastName%'";

		if(strlen($firstName > 0)) {
			$query .= "AND p.firstName LIKE '%$firstName%'";
		}	

		if(strlen($jobTitle) > 0) {
			$query .= "AND p.jobTitle LIKE '%$jobTitle%'";
		}

		if(strlen($email) > 0) {
			$query .= "AND p.email LIKE '%$email%'";
		}	

		if(strlen($dName) > 0) {
			$query .= "AND d.name = '$dName'";
		}	

		if(strlen($lName) > 0) {
			$query .= "AND l.name = '$lName'";
		}	

	} 
	
	else if(strlen($jobTitle) > 0) {
		$query = "";
		$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
		FROM personnel p 
		LEFT JOIN department d ON (d.id = p.departmentID) 
		LEFT JOIN location l ON (l.id = d.locationID) 
		WHERE p.jobTitle LIKE '%$jobTitle%'";

		if(strlen($firstName > 0)) {
			$query .= "AND p.firstName LIKE '%$firstName%'";
		}	

		if(strlen($lastName) > 0) {
			$query .= "AND p.lastName LIKE '%$lastName%'";
		}	

		if(strlen($email) > 0) {
			$query .= "AND p.email LIKE '%$email%'";
		}	

		if(strlen($dName) > 0) {
			$query .= "AND d.name = '$dName'";
		}	

		if(strlen($lName) > 0) {
			$query .= "AND l.name = '$lName'";
		}	
	}

	else if(strlen($email) > 0) {
		$query = "";
		$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
		FROM personnel p 
		LEFT JOIN department d ON (d.id = p.departmentID) 
		LEFT JOIN location l ON (l.id = d.locationID) 
		WHERE p.email LIKE '%$email%'";

		if(strlen($firstName > 0)) {
			$query .= "AND p.firstName LIKE '%$firstName%'";
		}	

		if(strlen($lastName) > 0) {
			$query .= "AND p.lastName LIKE '%$lastName%'";
		}	

		if(strlen($jobTitle) > 0) {
			$query .= "AND p.jobTitle LIKE '%$jobTitle%'";
		}	

		if(strlen($dName) > 0) {
			$query .= "AND d.name = '$dName'";
		}	

		if(strlen($lName) > 0) {
			$query .= "AND l.name = '$lName'";
		}	
	}

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>