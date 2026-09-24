<?php
session_start();

// Agar user login nahi hai to redirect back to login page
if (!isset($_SESSION['user'])) {
    header("Location: SignIn.php"); 
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CloudColors Dashboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      color: #fff;
      text-align: center;
      padding-top: 100px;
    }
    .card {
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 15px;
      display: inline-block;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      animation: fadeIn 1s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    a {
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
      display: inline-block;
    }
    a:hover {
      color: #ffeb3b;
    }
    .loading {
      margin-top: 15px;
      font-style: italic;
      color: #ffeb3b;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      50% { opacity: 0.5; }
    }
  </style>

</head>
<body>
  <div class="card">
    <h2>Welcome, <?php echo $_SESSION['user']; ?> 🎨</h2>
    <p>You are now inside the CloudColors Dashboard.</p>
    <p class="loading">Loading your personalized dashboard...</p>
    <a href="logout.php">Logout</a>
  </div>
   <script>
    // display theColorContrast.html file after 7 sec. delay
    setTimeout(function(){
      window.location.href = "ColorContrast.html";
    }, 7000);
  </script>
</body>
</html>
