<?php

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://public-holiday.p.rapidapi.com/" . $_REQUEST['year'] . "/" . $_REQUEST['countryCode'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: public-holiday.p.rapidapi.com",
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

?>
