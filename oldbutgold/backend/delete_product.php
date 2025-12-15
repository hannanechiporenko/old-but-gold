<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"];

// 1. Получаем пути изображений товара
$stmt = $conn->prepare("SELECT image_url FROM product_images WHERE product_id=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$images = $result->fetch_all(MYSQLI_ASSOC);

// 2. Удаляем файлы с сервера
foreach ($images as $img) {
    $filePath = __DIR__ . '/product_images/' . basename($img["image_url"]);
    if (file_exists($filePath)) {
        unlink($filePath);
    }
}

// 3. Удаляем записи из таблицы product_images
$stmt1 = $conn->prepare("DELETE FROM product_images WHERE product_id=?");
$stmt1->bind_param("i", $id);
$stmt1->execute();

// 4. Удаляем товар
$stmt2 = $conn->prepare("DELETE FROM products WHERE id=?");
$stmt2->bind_param("i", $id);
$stmt2->execute();

echo json_encode(["status" => "success"]);
