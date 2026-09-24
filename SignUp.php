<?php
include 'AuthenticUser.php'; // connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name     = $_POST['name'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $confirm  = $_POST['confirm'];

    // Password match check
    if ($password !== $confirm) {
        echo "Passwords do not match!";
        exit();
    }

    // Password hashing for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert query
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        echo "Signup successful! <a href='index.html'>Login here</a>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
