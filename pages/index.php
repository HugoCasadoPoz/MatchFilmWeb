<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="http://localhost/matchfilmWeb/assets/css/index.css">
    <link rel="stylesheet" href="http://localhost/matchfilmWeb/assets/css/header.css">
</head>
<body>
    <?php
        include ('./header.html');
    ?>
    <div id="alert"></div>
    <main id="main">
            <div id="movie">
                <img id="linkImagen"/>

                <div id="movie-info">
                    <h3 id="titulo"></h3>
                    <span id="nota" class=""></span>
                </div>
                <div id="overview">
                    <h3>Descripción:</h3>
                    <p id="descripcion"></p>
                </div>
            </div>
            <div id="acciones">
                <button id="dislike" style="margin-right: 10px;"><img src="http://localhost/matchfilmWeb/assets/img/boton-x.png" alt="X" width="50px" height="50px"></button>
                <button id="like" style="margin-left: 10px;"><img src="http://localhost/matchfilmWeb/assets/img/heart.png" alt="Tick" width="50px" height="50px"></button>        
            </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="http://localhost/matchfilmWeb/assets/js/index.js"></script>
</body>
</html>