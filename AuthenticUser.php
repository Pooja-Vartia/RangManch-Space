<?php
$host = "localhost";   
$user = "root";        
$pass = "";            
$db   = "cloudcolors"; 

// Connection create
$conn = new mysqli($host, $user, $pass, $db);

// Connection check
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
