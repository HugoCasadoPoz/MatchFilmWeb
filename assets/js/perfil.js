document.getElementById('nombreUser').innerHTML='Nombre Usuario: <b><u>'+localStorage.getItem('username')+'</u></b>'
let msjAlert = document.getElementById('alert');
function cargarAmigos(){
    let nombreUsuario = localStorage.getItem('username');

    if (nombreUsuario) {
        cargarInformacion();
        function cargarInformacion(){
        let url = `http://localhost/matchfilmWeb/api/post_amigos.php?nombre_usuario=${nombreUsuario}`;
        let options={
            method: 'GET',
            headers:{
                "Content-Type": "application/json" 
            }
        }
        fetch(url,options)
            .then(res => {
                if(res.status == 200){
                    return res.json();
                }else{
                    let amigos = document.getElementById('amigo');
                    amigos.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">No tienes pareja</h5>
                            <input type="text" id="nombreAmigo" class="form-control" placeholder="Nombre de usuario"><br>
                            <p id="usernameError"></p>
                            <button type="submit" id="btnAgregarAmigo" class="btn btn-primary">Agrega a tu pareja</button>
                        </div>`;
                        
                }
            })
            .then(data => {
                amigos = document.getElementById('amigo');
                if (data[0].nombre_amigo==nombreUsuario){
                    amigos.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><b>${data[0].nombre_usuario}</b></h5>
                            <button type="submit" onclick="eliminarAmigo('${data[0].nombre_usuario}')" class="btn btn-danger">Eliminar Pareja</button>
                        </div>
                    </div>`;
                }else{
                    amigos.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><b>${data[0].nombre_amigo}</b></h5>
                            <button type="submit" onclick="eliminarAmigo('${data[0].nombre_amigo}')" class="btn btn-danger">Eliminar Pareja</button>
                        </div>
                    </div>`;
                }
                    
                
            }).finally(()=>{
                document.getElementById('nombreAmigo').onblur = function() {
                    let nombreAmigoInput = this.value.trim();
                    let usernameError = document.getElementById('usernameError');
                    
                    if (nombreAmigoInput.length < 5) {
                        usernameError.innerHTML = 'El nombre de usuario debe tener al menos 5 letras.';
                        usernameError.style.color = 'red';
                        
                    } else {
                        usernameError.innerHTML = '';
                        document.getElementById('btnAgregarAmigo').addEventListener('click' ,function() {
                            agregarAmigo(nombreAmigoInput)
                        })
                    }
                };
            })
            .catch(error => {
                console.error(error);
            });
        }
    } else {
        console.error('No se encontró el nombre de usuario en el almacenamiento local');
    }
}
cargarAmigos();
cargarNotificaciones();

document.getElementById('editarUsuario').addEventListener('click', function() {
    let url = `http://localhost/matchfilmWeb/api/get_infoUsuario.php?nombre_usuario=${localStorage.getItem('username')}`;
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(url, options)
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                return res.json();
            }else {
                throw new Error('Error al obtener la información del usuario');
            }
        })
        .then(data => {
            console.log(data);
            document.getElementById('nombreUsuario').value = data.username;
            document.getElementById('emailUsuario').value = data.email;
        })
        .catch(error => {
            console.error(error);
        });

    var myModal = new bootstrap.Modal(document.getElementById('editarUsuarioModal'));
    myModal.show();
});
document.getElementById('btnEditarUsuario').addEventListener('click', function() {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(document.getElementById('nombreUsuario').value.length < 5 ||
     !emailRegex.test(document.getElementById('emailUsuario').value) ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(document.getElementById('contrasenaUsuario').value)){
        document.getElementById('alertModal').innerHTML=`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong>Campos incompletos!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
    }else{
        editarUsuario();
    }
});
 function editarUsuario(){
    let usuario = {
        'antiguo_username': localStorage.getItem('username'),
        'username': document.getElementById('nombreUsuario').value,
        'email': document.getElementById('emailUsuario').value,
        'password': document.getElementById('contrasenaUsuario').value
    }
    console.log(usuario)
    let url = 'http://localhost/matchfilmWeb/api/get_infoUsuario.php';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    };
    fetch(url, options)
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                return res.json(); 
            }else {
                throw new Error('Error al actualizar el usuario');
            }
        })
        .then(data => {
            console.log(data);
            localStorage.removeItem('username');
            localStorage.setItem('username', data.username);
            document.getElementById('alertModal').innerHTML=`
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Usuario editado correctamente!</strong>
                        <button type="button" class="btn btn-primary" onclick="reloadPage()">Recargar Página</button>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
            
        }) 
        .catch(error => {
            console.error(error);
        })
 }
 function reloadPage(){
    location.reload();
 };
function agregarAmigo(){
    let nuevoUser = {
        'nombre_usuario': localStorage.getItem('username'),
        'nombre_amigo' : document.getElementById('nombreAmigo').value,
        'notificacion' : "amistad",
    }
    
    let url = 'http://localhost/matchfilmWeb/api/post_notificacion.php';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUser)
    };
    fetch(url, options)
        .then(res => {
            if (res.status == 200) {
                return res.json(); 
            }
        })
        .then(data => {
            msjAlert.innerHTML=`
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Solicitud de amistad enviada Correctamente!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>` 
        }) 
    }

    
    function eliminarAmigo(nombreAmigo){
        let nombreUsuario = localStorage.getItem('username');
        let amigos = {
            "nombre_usuario": nombreUsuario,
            "nombre_amigo": nombreAmigo,
        }
        let url = `http://localhost/matchfilmWeb/api/gestionAmigos.php`;
        let options= {
            method: 'DELETE',
            body: JSON.stringify(amigos)
        }
        fetch(url, options)
        .then(res => {
            if(res.status == 201){
                return res;
            }else{
                msjAlert.innerHTML=`
                <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                    <strong>Error al eliminar pareja!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>` 
            }
        })
        .then(data => {
            msjAlert.innerHTML=`
            <div class="alert alert-sucess alert-dismissible fade show text-center" role="alert">
                <strong>Pareja eliminada!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>` 
            cargarAmigos();
            cargarNotificaciones()
        })
        .catch(error => {
            console.error(error);
        })
    }
    function cargarNotificaciones(){
        let nombreUsuario = localStorage.getItem('username');

        if (nombreUsuario) {
            let url = `http://localhost/matchfilmWeb/api/post_notificacion.php?nombre_usuario=${nombreUsuario}`;
            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };            
            fetch(url, options)
                .then(res => {
                    let notificaciones = document.getElementById('notificaciones');
                        notificaciones.innerHTML = '';
                        console.log(res);
                    if (res.status == 200){

                        return res.json();
                    }else{
                        let notificaciones = document.getElementById('notificaciones');
                        notificaciones.innerHTML = 'No tienes notificaciones';
                    }
                })
                .then(data => {
                    console.log(data);
                        data.forEach(notificacion => {
                            if (notificacion.notificacion == 'amistad' && notificacion.nombre_usuario == nombreUsuario){

                            }else if(notificacion.notificacion == 'amistad'){
                                notificaciones.innerHTML += `
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title"><b>${notificacion.nombre_usuario}</b></h5>
                                        <p class="card-text">${notificacion.notificacion}</p>
                                        <a href="#" onclick="aceptarAmigo('${notificacion.nombre_usuario}')" class="btn btn-primary">Aceptar</a>
                                        <a href="#" onclick="eliminarNotificacion('${notificacion.nombre_usuario}','${notificacion.nombre_amigo}','${notificacion.notificacion}')" class="btn btn-danger">Rechazar</a>
                                    </div>
                                </div>`;
                            }else if (notificacion.nombre_usuario != nombreUsuario){
                                notificaciones.innerHTML += `
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title"><b>${notificacion.nombre_usuario}</b></h5>
                                        <p class="card-text">${notificacion.notificacion}</p>
                                    </div>
                                </div>`;
                                eliminarNotificacion(`${notificacion.nombre_usuario}`, `${notificacion.nombre_amigo}`, `${notificacion.notificacion}`)
                            }else{
                                notificaciones.innerHTML += `
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title"><b>${notificacion.notificacion}</b></h5>
                                        <p class="card-text">Con: ${notificacion.nombre_amigo}</p>
                                    </div>
                                </div>`;
                                eliminarNotificacion(`${notificacion.nombre_usuario}`, `${notificacion.nombre_amigo}`, `${notificacion.notificacion}`)
                            }
                              
                        });   
                });
        } else {
            window.location='index.php';
        }
        
    };

    function aceptarAmigo(nombre_amigo){
        let nombreUsuario = localStorage.getItem('username');
        

        if (nombreUsuario) {
            let url = `http://localhost/matchfilmWeb/api/post_amigos.php?nombre_usuario=${nombreUsuario}`;
            let options={
                method: 'GET',
                headers:{
                    "Content-Type": "application/json" 
                }
            }
            fetch(url,options)
                .then(res => {
                    if(res.status == 200){
                        msjAlert.innerHTML=`
                        <div class="alert alert-sucess alert-dismissible fade show text-center" role="alert">
                            <strong>Ya tienes una pareja, no puedes agregar más!</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
                    }else{
                        let nuevoAmigo = {
                            'nombre_usuario': nombreUsuario,
                            'nombre_amigo' : nombre_amigo,
                        }
                        
                        let url = 'http://localhost/matchfilmWeb/api/gestionAmigos.php';
                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(nuevoAmigo)
                        };
                        fetch(url, options)
                            .then(res => {
                                if (res.status == 200) {
                                    return res.json(); 
                                }
                            })
                            .then(data => {
                                msjAlert.innerHTML=`
                                    <div class="alert alert-sucess alert-dismissible fade show text-center" role="alert">
                                        <strong>Pareja agregada correctamente!</strong>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`
                
                            }).finally(()=>{
                                console.log(nombreUsuario + nombre_amigo);
                                eliminarNotificacion(nombre_amigo, nombreUsuario , 'amistad')
                                cargarNotificaciones();
                                cargarAmigos();
                            
                            })
                    }
                })
                
        }
    }
                               
    function eliminarNotificacion(nombre_usuario, nombre_amigo, notificacion){
        let eliminar={
            "nombre_usuario": nombre_usuario,
            "nombre_amigo": nombre_amigo,
            "notificacion": notificacion
        }
        console.log(eliminar);
        let url = `http://localhost/matchfilmWeb/api/delete_notificacion.php`;
        const opciones= {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eliminar)
        }
        fetch(url, opciones)
            .then(response=>{
                return response.json();
            }).then(datos =>{ 
            }).catch(error=> {
                console.log(error)
            })
            
    }                            
    if(localStorage.getItem('username')){
        document.getElementById('cerrarSesión').addEventListener('click', cerrarSesion)
        function cerrarSesion(){
            localStorage.clear();
            window.location.href = './index.php';
        }
    }else{
        localStorage.removeItem('token');        
        localStorage.removeItem('username');    
        msjAlert.innerHTML=`
                        <div class="alert alert-sucess alert-dismissible fade show text-center" role="alert">
                            <strong>Necesita iniciar sesion!</strong>
                            <a href="./login.php" class="btn btn-primary mr-2">Ir al inicio de sesión</a>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`    
    }
        
