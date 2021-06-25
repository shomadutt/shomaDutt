<?php

    ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    $api = 'b601b8264141e308ccb7e5d14713b07de85c2b65';

    $url='https://calendarific.com/api/v2/holidays?&api_key=' . $api . '&country=' .  $_REQUEST['countryCode'] . '&year=2021';

	$ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result=curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result, true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . "ms";
    $output['data'] = $decode;

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output); 
?>
