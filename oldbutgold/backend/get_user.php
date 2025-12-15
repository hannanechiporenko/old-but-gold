<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data["userId"];

$stmt = $conn->prepare("SELECT id, username, created_at FROM users WHERE id=?");
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();
echo json_encode($result->fetch_assoc());
