<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

// безопасно извлекаем поля
$username = $data["username"] ?? null;
$password = $data["password"] ?? null;

if (!$username || !$password) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Incorrect username or password"]);
    exit;
}

// привязываем результат
$stmt->bind_result($userId, $hashedPassword);
$stmt->fetch();

// проверяем, что пароль действительно получен
if ($hashedPassword === null) {
    echo json_encode(["status" => "error", "message" => "Password not found"]);
    exit;
}

// проверяем пароль
if (!password_verify($password, $hashedPassword)) {
    echo json_encode(["status" => "error", "message" => "Incorrect username or password"]);
    exit;
}

echo json_encode([
    "status" => "success",
    "userId" => $userId
]);
