<?php
header('Content-Type: application/json');
include('curl.php');
$resi = 'resi='.$_GET['resi'];
$pengirim = '&pengirim='.$_GET['pengirim'];
$key = '&k=5a545e84a0d9b12bc6b71291b18c0f7a';
$param = $resi.$pengirim.$key;
echo httpGet("http://ibacor.com/api/cek-resi?".$param);