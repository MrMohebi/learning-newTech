<?php
require dirname(__FILE__) . '/../vendor/autoload.php';
use Gap\SDP\Api;


$chat_id = $_POST['chat_id'];
$type = $_POST['type'];
$from = $_POST['from'];
$data = $_POST['data'];

$token = "e28fe23f321f88b40e291c7d762741d717c13d9acbff6b354198b6dec3d142c7";
try {
    $gap = new Api($token);
} catch (Exception $e) {exit();}



if($type == "file")
    $message_id = $gap->sendText($chat_id ,$data);
