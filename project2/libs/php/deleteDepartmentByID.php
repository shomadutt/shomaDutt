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

	$deleteDept = $_POST['deleteDept']; 

	$query = mysqli_query($conn,"SELECT * FROM personnel WHERE departmentID ='$deleteDept'");

	$sql = "DELETE FROM department WHERE id = '$deleteDept'";

	//Response
	//Checking to see if there are employees in the department
	if (mysqli_num_rows($query) > 0) {
        echo "Deletion not allowed.";
    } 
	
	else if (!mysqli_query($conn, $sql)) {
        echo 'Could not delete department.';
	} 
	
	else {
		echo "Deleted!";
	}

?>