<?php
require "db.php";

$id = $_POST["product_id"] ?? null;
$title = $_POST["title"] ?? '';
$desc = $_POST["description"] ?? '';
$price = $_POST["price"] ?? '';
$category = $_POST["category_id"] ?? '';
$condition = $_POST["condition_id"] ?? '';

$stmt = $conn->prepare("
    UPDATE products SET title=?, description=?, price=?, category_id=?, condition_id=? 
    WHERE id=?
");
$stmt->bind_param("ssdiii", $title, $desc, $price, $category, $condition, $id);

$stmt->execute();

// Если загружены новые фото
if (!empty($_FILES["images"]["name"][0])) {

    // Удаляем старые фото
    $del = $conn->prepare("DELETE FROM product_images WHERE product_id=?");
    $del->bind_param("i", $id);
    $del->execute();

    $uploadDir = "product_images/";

    foreach ($_FILES["images"]["tmp_name"] as $index => $tmpName) {

        if (!$_FILES["images"]["name"][$index]) continue;

        $fileName = time() . "_" . $_FILES["images"]["name"][$index];
        $filePath = $uploadDir . $fileName;

        move_uploaded_file($tmpName, $filePath);

        $pathDB = "/backend/product_images/" . $fileName;

        $stmtImg = $conn->prepare("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)");
        $stmtImg->bind_param("is", $id, $pathDB);
        $stmtImg->execute();
    }
}

echo json_encode(["status" => "success"]);
