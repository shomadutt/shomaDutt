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
		
	if (isset($_POST['checkList'])) {


		$checkList = $_POST['checkList']; 

		//print_r($checkList);


		foreach($checkList as $check) {
		
			$sql = "DELETE FROM personnel WHERE id ='".$check."'";
			$result = mysqli_query ($conn, $sql);
        		
        }
	}


	if ($result) {
        echo "Deleted!";
    }else{
        echo 'Could not delete.';	
}
?>