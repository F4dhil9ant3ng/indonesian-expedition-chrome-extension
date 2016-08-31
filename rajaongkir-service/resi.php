<?php
header('Content-Type: application/json');
include('curl.php');
$resi = 'resi='.$_GET['resi'];
$pengirim = '&pengirim='.$_GET['pengirim'];
$key = '&k='.KEY_IBACOR;
$param = $resi.$pengirim.$key;
echo httpGet("http://ibacor.com/api/cek-resi?".$param);