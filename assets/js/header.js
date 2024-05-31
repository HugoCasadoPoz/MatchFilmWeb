let logotipos = document.getElementById('logotipos');
if(localStorage.getItem('username')){
    logotipos.innerHTML+=`<div class="perfil">
                            <a href="http://localhost/matchfilmWeb/pages/perfil.php">
                            <b>${localStorage.getItem('username')}</b>
                            <img src="http://localhost/matchfilmWeb/assets/img/usuario.png" alt="Logo de perfil" width="45px" height="45px">
                            </a>
                          </div>`;
}else{
    logotipos.innerHTML+=`<div id='botones' class="perfil">
                            <a href="http://localhost/matchfilmWeb/pages/login.php">
                                <button class="btn btn-primary">Login</button>
                            </a>
                            <a href="http://localhost/matchfilmWeb/pages/register.php">
                                <button class="btn btn-primary">Registro</button>
                            </a>
                          </div>`
}