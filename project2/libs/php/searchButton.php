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

	print_r($firstName);
	print_r($lastName);
	print_r($jobTitle);
	print_r($email);
	print_r($dName);
	print_r($lName);

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

	if(isset($firstName)) {
		$query = "";
		$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
		FROM personnel p 
		LEFT JOIN department d ON (d.id = p.departmentID) 
		LEFT JOIN location l ON (l.id = d.locationID) 
		WHERE p.firstName LIKE '%$firstName%'";

		if(isset($lastName)) {
			$query .= "AND p.lastName LIKE '%$lastName%'";
		}	

		// if(isset($jobTitle)) {
		// 	$query .= "AND p.jobTitle LIKE '%$jobTitle%'";
		// }

		// if(isset($email)) {
		// 	$query .= "AND p.email LIKE '%$email%'";
		// }	

		// if(isset($dName)) {
		// 	$query .= "AND d.name = '$dName'";
		// }	

		// if(isset($lName)) {
		// 	$query .= "AND l.name = '$lName'";
		// }	
	} 
	
	// else if(isset($lastName)) {
	// 	$query = "";
	// 	$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
	// 	FROM personnel p 
	// 	LEFT JOIN department d ON (d.id = p.departmentID) 
	// 	LEFT JOIN location l ON (l.id = d.locationID) 
	// 	WHERE p.lastName LIKE '%$lastName%'";

	// 	if(isset($firstName)) {
	// 		$query .= "AND p.firstName LIKE '%$firstName%'";
	// 	}	

	// 	if(isset($jobTitle)) {
	// 		$query .= "AND p.jobTitle LIKE '%$jobTitle%'";
	// 	}

	// 	if(isset($email)) {
	// 		$query .= "AND p.email LIKE '%$email%'";
	// 	}	

	// 	if(isset($dName)) {
	// 		$query .= "AND d.name = '$dName'";
	// 	}	

	// 	if(isset($lName)) {
	// 		$query .= "AND l.name = '$lName'";
	// 	}	

	// } 
	
	// else if(isset($jobTitle)) {
	// 	$query = "";
	// 	$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
	// 	FROM personnel p 
	// 	LEFT JOIN department d ON (d.id = p.departmentID) 
	// 	LEFT JOIN location l ON (l.id = d.locationID) 
	// 	WHERE p.jobTitle LIKE '%$jobTitle%'";

	// 	if(isset($firstName)) {
	// 		$query .= "AND p.firstName LIKE '%$firstName%'";
	// 	}	

	// 	if(isset($lastName)) {
	// 		$query .= "AND p.lastName LIKE '%$lastName%'";
	// 	}	

	// 	if(isset($email)) {
	// 		$query .= "AND p.email LIKE '%$email%'";
	// 	}	

	// 	if(isset($dName)) {
	// 		$query .= "AND d.name = '$dName'";
	// 	}	

	// 	if(isset($lName)) {
	// 		$query .= "AND l.name = '$lName'";
	// 	}	
	// }

	// else if(isset($email)) {
	// 	$query = "";
	// 	$query = "SELECT p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
	// 	FROM personnel p 
	// 	LEFT JOIN department d ON (d.id = p.departmentID) 
	// 	LEFT JOIN location l ON (l.id = d.locationID) 
	// 	WHERE p.email LIKE '%$email%'";

	// 	if(isset($firstName)) {
	// 		$query .= "AND p.firstName LIKE '%$firstName%'";
	// 	}	

	// 	if(isset($lastName)) {
	// 		$query .= "AND p.lastName LIKE '%$lastName%'";
	// 	}	

	// 	if(isset($jobTitle)) {
	// 		$query .= "AND p.jobTitle LIKE '%$jobTitle%'";
	// 	}	

	// 	if(isset($dName)) {
	// 		$query .= "AND d.name = '$dName'";
	// 	}	

	// 	if(isset($lName)) {
	// 		$query .= "AND l.name = '$lName'";
	// 	}	
	// }

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