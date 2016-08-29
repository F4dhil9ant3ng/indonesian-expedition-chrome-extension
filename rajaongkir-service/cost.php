<?php
header('Content-Type: application/json');
include('curl.php');
var_dump($_POST);die;
echo httpPost("http://api.rajaongkir.com/starter/cost", "origin=501&destination=114&weight=1700&courier=jne");