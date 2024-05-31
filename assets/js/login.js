if (!(localStorage.getItem('username'))){
    let msjAlert = document.getElementById('alert');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let validar = false;

    username.onblur = function() {
        if (username.value.length < 5) {
            document.getElementById('usernameError').innerHTML = 'El Usuario tiene que tener al menos 5 caracteres';
            validar=false
        } else {
            document.getElementById('usernameError').innerHTML = '';
            validar=true
        }
    }

    password.onblur = function() {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(password.value)) {
            document.getElementById('passwordError').innerHTML = 'La contraseña debe contener al menos una letra minúscula,mayúscula y un número';
            validar=false;
        } else {
            document.getElementById('passwordError').innerHTML = '';
            validar=true;
        }
    }
    document.getElementById('loginBtn').addEventListener('click', function() {
        if (!validar || username=='' || password=='') {
            document.getElementById('alert').innerHTML=`
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Error en el formusdfsdfsdlario</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                    console.log('hola')

        }else{
            login();
        }
    });

    function login(){
        let logusername={
            'username' : username.value.trim(),
            'password' : password.value.trim()
        }

        let url='http://localhost/matchfilmWeb/api/post_login.php';
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logusername),
          };
          fetch(url, options)
            .then(res => {
                console.log(res);
                if (res.status==200){
                    console.log(res);
                    return res.json();         
                }
                if(res.status==401){
                    msjAlert.innerHTML=`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong>Credenciales no válidas!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`                    
                    close;
                }
                else{
                    msjAlert.innerHTML=`
                    <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        <strong>Credenciales no válidas!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>` 
                    close
                }
            })
            .then(data => {
                console.log(data);
                localStorage.setItem('token', data.token);        
                localStorage.setItem('username', data.username);        
                const currentDate = new Date();
                localStorage.setItem('tokenStartTime', currentDate.getTime());
                msjAlert.innerHTML=`
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Inicio de Sesión Correcto!</strong>
                        <a href="./index.php" class="btn btn-primary mr-2">Ir al Inicio</a>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
            })        
    }
}else{  
    let msjAlert = document.getElementById('alert');

    msjAlert.innerHTML=`
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Ya tienes la sesión Iniciada</strong>
                        <a href="./index.php" class="btn btn-primary mr-2">Ir a Inicio</a>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
}


