<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CloudColors Dashboard - Authentication</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .auth-card {
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      overflow: hidden;
      animation: fadeInUp 1s ease;
    }
    @keyframes fadeInUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .auth-header {
      background: #2575fc;
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    .form-control:focus {
      border-color: #2575fc;
      box-shadow: 0 0 0 0.2rem rgba(37,117,252,.25);
    }
    .btn-custom {
      background: #2575fc;
      color: #fff;
      transition: 0.3s;
    }
    .btn-custom:hover {
      background: #6a11cb;
    }
    .toggle-link {
      color: #2575fc;
      cursor: pointer;
      font-weight: 600;
    }
  </style>
</head>
<body>

<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <div class="auth-card">
        <div class="auth-header">
          <h2>CloudColors Dashboard</h2>
          <p>Sign In to Continue</p>
        </div>
        <div class="p-4">
          <!-- Sign In Form -->
          <form id="signinForm" action="signin.php" method="POST">
            <div class="mb-3">
              <label>Email</label>
              <input type="email" name="email" class="form-control" placeholder="Enter email" required>
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input type="password" name="password" class="form-control" placeholder="Enter password" required>
            </div>
            <button type="submit" class="btn btn-custom w-100">Sign In</button>
          </form>

          <!-- Sign Up Form (hidden initially) -->
          <form id="signupForm" action="signup.php" method="POST" style="display:none;">
            <div class="mb-3">
              <label>Name</label>
              <input type="text" name="name" class="form-control" placeholder="Enter name" required>
            </div>
            <div class="mb-3">
              <label>Email</label>
              <input type="email" name="email" class="form-control" placeholder="Enter email" required>
            </div>
            <div class="mb-3">
              <label>Password</label>
              <input type="password" name="password" class="form-control" placeholder="Create password" required>
            </div>
            <div class="mb-3">
              <label>Confirm Password</label>
              <input type="password" name="confirm" class="form-control" placeholder="Confirm password" required>
            </div>
            <button type="submit" class="btn btn-custom w-100">Sign Up</button>
          </form>

          <div class="text-center mt-3">
            <span id="toggleText">Don't have an account? <span class="toggle-link" onclick="toggleForms()">Sign Up</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
  function toggleForms() {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const toggleText = document.getElementById('toggleText');

    if (signinForm.style.display === 'none') {
      signinForm.style.display = 'block';
      signupForm.style.display = 'none';
      toggleText.innerHTML = "Don't have an account? <span class='toggle-link' onclick='toggleForms()'>Sign Up</span>";
    } else {
      signinForm.style.display = 'none';
      signupForm.style.display = 'block';
      toggleText.innerHTML = "Already have an account? <span class='toggle-link' onclick='toggleForms()'>Sign In</span>";
    }
  }
</script>

</body>
</html>
