<?php
require "db.php";

$result = $conn->query("SELECT id, name FROM product_condition ORDER BY name");
$conditions = [];

while ($row = $result->fetch_assoc()) {
    $conditions[] = $row;
}

echo json_encode($conditions);
