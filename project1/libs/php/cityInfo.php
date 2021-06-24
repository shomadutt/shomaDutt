<?php

	// remove for production

    $curl = curl_init();
    
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://countries-cities.p.rapidapi.com/location/country/" . $_REQUEST['countryCode']. "/city/list",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: countries-cities.p.rapidapi.com",
            "x-rapidapi-key: 62073203f6mshc17cf518a0f6c98p17b860jsn20cbb3b20225"
        ],
    ]);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }

	// ini_set('display_errors', 'On');
	// error_reporting(E_ALL);

	// $executionStartTime = microtime(true);

    // $url='http://universities.hipolabs.com/search?country=' . $_REQUEST['countryText'];

	// $ch = curl_init();
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_URL, $url);

    // $result=curl_exec($ch);

    // curl_close($ch);

    // $decode = json_decode($result, true);

    // $output['status']['code'] = "200";
    // $output['status']['name'] = "ok";
    // $output['status']['description'] = "success";
    // $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . "ms";
    // $output['data'] = $decode;

    // header('Content-Type: application/json; charset=UTF-8');

    // echo json_encode($output); 

?>
