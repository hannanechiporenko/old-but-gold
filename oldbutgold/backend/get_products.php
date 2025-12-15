<?php
require_once "db.php";

// Получаем данные из POST
$search = $_POST['search'] ?? '';
$minPrice = $_POST['minPrice'] ?? '';
$maxPrice = $_POST['maxPrice'] ?? '';
$categories = $_POST['categories'] ?? [];
$conditions = $_POST['conditions'] ?? [];
$sort = $_POST['sort'] ?? 'newest';

// Базовый SQL
$sql = "SELECT p.*, c.name AS category_name, cond.name AS condition_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_condition cond ON p.condition_id = cond.id
        WHERE 1=1";

// Фильтр по поиску
if (!empty($search)) {
    $search = $conn->real_escape_string($search);
    $sql .= " AND p.title LIKE '%$search%'";
}

// Фильтр по цене
if ($minPrice !== '') {
    $sql .= " AND p.price >= " . floatval($minPrice);
}
if ($maxPrice !== '') {
    $sql .= " AND p.price <= " . floatval($maxPrice);
}

// Фильтр по категориям
if (!empty($categories)) {
    $cats = array_map('intval', $categories);
    $sql .= " AND p.category_id IN (" . implode(",", $cats) . ")";
}

// Фильтр по состоянию
if (!empty($conditions)) {
    $conds = array_map('intval', $conditions);
    $sql .= " AND p.condition_id IN (" . implode(",", $conds) . ")";
}

// Сортировка
switch ($sort) {
    case "oldest":
        $sql .= " ORDER BY p.created_at ASC";
        break;
    case "price_low":
        $sql .= " ORDER BY p.price ASC";
        break;
    case "price_high":
        $sql .= " ORDER BY p.price DESC";
        break;
    case "az":
        $sql .= " ORDER BY p.title ASC";
        break;
    case "za":
        $sql .= " ORDER BY p.title DESC";
        break;
    default:
        $sql .= " ORDER BY p.created_at DESC"; // newest
}

// Выполняем запрос
$result = $conn->query($sql);
$products = [];

while ($row = $result->fetch_assoc()) {
    $product_id = $row['id'];
    $images = [];
    $img_res = $conn->query("SELECT image_url FROM product_images WHERE product_id = $product_id");
    while ($img_row = $img_res->fetch_assoc()) {
        $images[] = $img_row['image_url'];
    }
    $row['images'] = $images;
    $products[] = $row;
}

// Возвращаем JSON
echo json_encode($products);
