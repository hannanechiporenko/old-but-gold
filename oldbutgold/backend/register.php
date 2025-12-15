<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$email = $data["email"];
$password = $data["password"];

if (!$username || !$email || !$password) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

// Проверка на существование
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "A user with that user name already exists."]);
    exit;
}

// Хэш пароля
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Добавление
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "User creation error"]);
}
