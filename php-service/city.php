<?php
header('Content-Type: application/json');
include('curl.php');
echo httpGet("http://api.rajaongkir.com/starter/city");