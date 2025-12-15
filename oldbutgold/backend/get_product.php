<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data["id"]);

// Получаем товар
$sql = "SELECT p.*, 
        c.name AS category_name, 
        cond.name AS condition_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_condition cond ON p.condition_id = cond.id
        WHERE p.id = $id";

$res = $conn->query($sql);
$product = $res->fetch_assoc();

// Картинки
$images = [];
$img_res = $conn->query("SELECT image_url FROM product_images WHERE product_id = $id");
while ($row = $img_res->fetch_assoc()) {
    $images[] = $row['image_url'];
}

// Продавец
$user_id = $product['user_id'];

$seller_res = $conn->query("SELECT id, username, created_at FROM users WHERE id = $user_id");
$seller = $seller_res->fetch_assoc();

// Отправка JSON
echo json_encode([
    "product" => $product,
    "images" => $images,
    "seller" => $seller
]);
