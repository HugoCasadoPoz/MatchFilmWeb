<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="http://localhost/matchfilmWeb/assets/css/login.css">
    <link rel="stylesheet" href="http://localhost/matchfilmWeb/assets/css/header.css">

</head>
<body>
    <?php
        include ('./header.html');
    ?>
    
    <div class="container center-container">
      <div class="login-form">
        <div id="alert"></div>
        <h1 class="text-center">Login</h1>
        <!-- <form method="POST"> -->
          <div>
            <input type="text" name="username" id="username" class="form-control" minlength="5" placeholder="Usuario" required>
            <p id="usernameError" class="text-danger"></p>
          </div>
          <div>
            <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña" required >
            <p id="passwordError" class="text-danger"></p>
          </div>
          <div class="d-flex justify-content-between">
            <button id="loginBtn" class="btn btn-primary">Login</button>
            <input type="reset" value="Reset" id="cancel" class="btn btn-danger">
          </div>
        <!-- </form> -->
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <script src="http://localhost/matchfilmWeb/assets/js/login.js"></script>
</body>
</html>
