<?php
header("Access-Control-Allow-Origin: *");
$ch = curl_init('http://tuzlanski.ba/feed/');
curl_setopt($ch, CURLOPT_ENCODING , ''); // request compressed
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'MyUserAgent');
$output = curl_exec($ch);
curl_close($ch);
echo $output;
exit;
?>