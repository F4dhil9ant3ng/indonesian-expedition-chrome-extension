<?php
header('Content-Type: application/json');
include('curl.php');
$resi = 'resi='.$_GET['resi'];
$pengirim = '&pengirim='.$_GET['pengirim'];
$key = '&k=36ce1c255b029ac55c7ce6ad12e8bd88';
$param = $resi.$pengirim.$key;
echo httpGet("http://ibacor.com/api/cek-resi?".$param);