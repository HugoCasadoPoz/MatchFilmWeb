<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MatchFilm</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        body {
            background-color: rgba(0, 0, 0, 0.3);
            color: white;
        }

        .hero-section {
            background-color: #586294;
            padding-top: 100px;
            padding-bottom: 100px;
            text-align: center;
            color: white;
        }

        .features-section {
            background-color: #858eb9;
            padding: 60px 0;
        }

        .feature {
            margin: 20px 0;
        }
        .cta-section {
            background-color: #586294;
            padding: 60px 0;
            text-align: center;
        }

        .footer {
            background-color: #858eb9;
            padding: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <section class="hero-section">
        <div class="container">
            <h1 class="display-4">Bienvenido a MatchFilm</h1>
            <p class="lead">Descubre vuestros gustos similares</p>
            <a href="./pages/login.php" class="btn btn-lg btn-light">Inicia Sesión</a>
            <a href="./pages/register.php" class="btn btn-lg btn-light">Registrarte</a>
        </div>
    </section>
    <section class="features-section">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-4 feature">
                    <h3><b>1 - Agrega a tu pareja</b></h3>
                    <p>Añade a tu pareja de amigo</p>
                </div>
                <div class="col-md-4 feature">
                    <h3><b>2 - Selecciona tus películas favoritas</b></h3>
                    <p>Da Like a las películas que más ganas tengas de ver</p>
                </div>
                <div class="col-md-4 feature">
                    <h3><b>3 - MATCH!</b></h3>
                    <p>Felicidades, habéis hecho un match ahora solo queda sofa, manta y película junto con tu persona favorita</p>
                </div>
            </div>
        </div>
    </section>
    <section class="cta-section">
        <div class="container">
            <h2 class="mb-4">Únete a MatchFilm Hoy</h2>
            <a href="./pages/register.php" class="btn btn-lg btn-light">Regístrate</a>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 MatchFilm. Todos los derechas reservados a Hugo Casado.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
