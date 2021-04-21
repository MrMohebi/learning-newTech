<?php
require dirname(__FILE__) . '/../vendor/autoload.php';
use Gap\SDP\Api;

include_once "tokens.php";

$chat_id = $_POST['chat_id'];
$type = $_POST['type'];
$from = $_POST['from'];
$data = $_POST['data'];

try {
    $gap = new Api($token);
} catch (Exception $e) {exit();}



if($type == "file")
    $message_id = $gap->sendText($chat_id ,$data);
