<?php
session_start();
include 'AuthenticUser.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email    = $_POST['email'];
    $password = $_POST['password'];

    // User fetch 
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Password verify 
        if (password_verify($password, $row['password'])) {
            $_SESSION['user'] = $row['email'];
            header("Location: Dashboard.php"); 
            exit();
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No user found with this email!";
    }
}
?>
<!-- Signin Form -->
<form method="POST" action="SignIn.php">
  <input type="email" name="email" placeholder="Enter Email" required><br>
  <input type="password" name="password" placeholder="Enter Password" required><br>
  <button type="submit">Login</button>
</form>
