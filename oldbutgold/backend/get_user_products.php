<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data["userId"];

// Получаем товары с названиями категории и состояния
$stmt = $conn->prepare("
    SELECT p.*, c.name AS category_name, cond.name AS condition_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_condition cond ON p.condition_id = cond.id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$products = [];

while ($p = $result->fetch_assoc()) {

    // Загружаем изображения товара
    $stmtImg = $conn->prepare("SELECT image_url FROM product_images WHERE product_id=?");
    $stmtImg->bind_param("i", $p["id"]);
    $stmtImg->execute();
    $imgRes = $stmtImg->get_result();

    $p["images"] = [];
    while ($img = $imgRes->fetch_assoc()) {
        $p["images"][] = $img["image_url"];
    }

    $products[] = $p;
}

echo json_encode($products);
