<!DOCTYPE html>
<html lang="en">
<head>
    <title>MatchFilm - Likes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="http://localhost/matchfilmWeb/assets/css/perfil.css">
    <link rel="stylesheet" href="http://localhost/matchfilmWeb/assets/css/header.css">
</head>
<body>
    <?php
        include ('./header.html');
    ?>
    <div id="alert"></div>
    <main>  
        <div class="perfilUsu">           
            <h3>Perfil</h3>
            <div>
                <div class="card">
                    <div class="card-body">
                        <h3 id="nombreUser">Nombre de usuario:</h3>
                        <button class='btn btn-danger' id="editarUsuario">Editar Perfil</button>
                        <button class='btn btn-danger' id="cerrarSesión">Cerrar Sesión</button></br>
                    </div>
                </div>
            </div>
        </div>  
        <div class="amigo">
            <h3>Pareja:</h3>
            <div id="amigo"></div>
        </div>
        <div class="notificaciones">
            <h3>Notificaciones:</h3>
            <div id="notificaciones"></div>
        </div>
        <!-- Modal editar perfil -->
        <div class="modal fade" id="editarUsuarioModal" tabindex="-1" aria-labelledby="editarUsuarioModalLabel" aria-hidden="true">
    
        <div class="modal-dialog">
                <div class="modal-content">
                <div id="alertModal"></div>
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarUsuarioModalLabel">Editar Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="nombreUsuario" class="form-label">Nombre de Usuario</label>
                                <input type="text" class="form-control" id="nombreUsuario" placeholder="Nombre de Usuario" required>
                            </div>
                            <div class="mb-3">
                                <label for="emailUsuario" class="form-label">Email</label>
                                <input type="email" class="form-control" id="emailUsuario" placeholder="Email del Usuario" required>
                            </div>
                            <div class="mb-3">
                                <label for="contrasenaUsuario" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="contrasenaUsuario" placeholder="Contraseña del Usuario" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" id="btnEditarUsuario">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="http://localhost/matchfilmWeb/assets/js/perfil.js"></script>

</body>
</html>
