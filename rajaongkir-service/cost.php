<?php
header('Content-Type: application/json');
include('curl.php');
echo httpPost("http://api.rajaongkir.com/starter/cost", http_build_query($_POST));