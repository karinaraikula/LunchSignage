<?php
// Set CORS headers, by default accepts everything
header("Access-Control-Allow-Origin: *");
// Set correct api url here, e.g. https://www.example.com/api
//en osannut
$api_uri = "https://www.foodandco.fi/api/restaurant/menu";
if( !$_SERVER['PATH_INFO'] ) {
  die('404 sorry');
}
$req_uri = $_SERVER['REQUEST_URI'];
$req_api = explode("fazer-proxy.php", $req_uri)[1];
$jsonurl = $api_uri.$req_api;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $jsonurl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
$result = curl_exec($ch);
if( !$result ) {
  die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
}
curl_close($ch);
echo $result;