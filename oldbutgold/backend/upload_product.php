<?php
require "db.php";

$userId = $_POST["userId"];
$title = $_POST["title"];
$desc = $_POST["description"];
$price = $_POST["price"];
$category = $_POST["category_id"];
$condition = $_POST["condition_id"];

$stmt = $conn->prepare("INSERT INTO products (user_id, title, description, price, category_id, condition_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issdii", $userId, $title, $desc, $price, $category, $condition);
$stmt->execute();

$product_id = $conn->insert_id;

$uploadDir = "product_images/";

foreach ($_FILES["images"]["tmp_name"] as $i => $tmpName) {

    if (!$_FILES["images"]["name"][$i]) continue;

    $fileName = time() . "_" . $_FILES["images"]["name"][$i];
    $filePath = $uploadDir . $fileName;

    move_uploaded_file($tmpName, $filePath);

    $stmt2 = $conn->prepare("INSERT INTO product_images (product_id, image_url) VALUES (?, ?)");
    $path_in_db = "/backend/product_images/" . $fileName;
    $stmt2->bind_param("is", $product_id, $path_in_db);
    $stmt2->execute();
}

echo json_encode(["status" => "success"]);
