<?php
header("Access-Control-Allow-Origin: *");
$ch = curl_init('https://www.oslobodjenje.ba/feed/category/1');
curl_setopt($ch, CURLOPT_ENCODING , ''); // request compressed
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'MyUserAgent');
$output = curl_exec($ch);
curl_close($ch);
echo $output;
exit;
?>