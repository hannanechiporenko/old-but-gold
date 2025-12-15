<?php
require "db.php";

$result = $conn->query("SELECT id, name FROM categories ORDER BY name");

$categories = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($categories);
