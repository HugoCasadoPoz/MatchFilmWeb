if(localStorage.getItem('username')){
        
    let resultados = document.getElementById("resultados")
    let btnMatch = document.getElementById('matches')
    btnMatch.addEventListener('click', match)
    let btnLike = document.getElementById('like')
    btnLike.addEventListener('click', likes);
    // let msgAlert = document.getElementById('alert')
    match()
    function likes(){
        resultados.innerHTML=''
        // msgAlert.innerHTML='';
        btnMatch.classList.remove('btnPulsado')
        btnLike.classList.add('btnPulsado')
        resultados.innerHTML='';
        let nombreUsuario = localStorage.getItem('username')
        let url = `http://localhost/matchfilmWeb/api/get_likes.php?nombre_usuario=${nombreUsuario}`;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(url, options)
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                        
                }
                if (res.status == 400) {
                    resultados.innerHTML = "<h2>No tienes ningún like</h2>";
                }
            }).then(data => {
                console.log(data);
                if (data.length === 0) {
                    resultados.innerHTML = "<h2>No tienes ningún like</h2>";
                }
                data.forEach(pelicula => {
                    console.log(pelicula.movie_id);
                    let url = `https://api.themoviedb.org/3/movie/${pelicula.movie_id}?language=es-ES`
                    const options = {
                        method: 'GET',
                        headers: {
                          accept: 'application/json',
                          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2EzMWVkZGFiNjE0OGVhNWM1ODY1YWQ5NWZmMWQ4MSIsInN1YiI6IjY1ZTRlNDcyMjBlNmE1MDE2MzUxZjQzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IRKLCdBV7SK2KvzvVrlIPar4DjLApqE4RboCW99658'
                        }
                      };
                    fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        resultados.innerHTML+=`
                        <div id="movie">
                            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}"/>
                            <div id="movie-info">
                                <h3>${data.title}</h3>
                                <span class="${getColor(data.vote_average)}">${data.vote_average.toFixed(1)}</span>
                            </div>
                            <div id="overview">
                            <h3>Descripción:</h3>
                            <p>${data.overview}</p>
                            </div>
                        </div>
                        `
                    })
                });
            }) 
    }
    function match(){
        resultados.innerHTML=''
        // msgAlert.innerHTML='';
        btnMatch.classList.add('btnPulsado')
        btnLike.classList.remove('btnPulsado')
        let nombreUsuario = localStorage.getItem('username')
        let url = `http://localhost/matchfilmWeb/api/post_amigos.php?nombre_usuario=${nombreUsuario}`;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(url, options)
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                        
                }
                if (res.status == 400) {
                   document.getElementById('resultados').innerHTML('No tienes amigo, agregue a uno');
                }
            }).then(data => {
                let amigo
                if (nombreUsuario == data[0].nombre_amigo){
                    amigo = data[0].nombre_usuario
                }else if (nombreUsuario == data[0].nombre_usuario){
                    amigo = data[0].nombre_amigo
                }
                let amigos = {
                    "usuario" : nombreUsuario,
                    "amigo" : amigo
                }
                console.log(amigos);
                let url ='http://localhost/matchfilmWeb/api/get_match.php'
                let options ={
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(amigos)
                }
                fetch(url, options)
                    .then(response =>{
                        console.log(response);
                       
                        if(response.status===400){
                            resultados.innerHTML='No tienes ningun match todavía'
                            throw new Error('No tienes ningún match todavía');
                        }
                        if (response.status==200){
                            return response.json()
                        }
                    })
                    .then(data => {
                        if (!data) {
                            resultados.innerHTML = "<h2>No tenéis ningún Match todavía, sigue intentandolo</h2>";
                            return
                        }
                        console.log(data);
                       data.forEach(pelicula => {
                        let url = `https://api.themoviedb.org/3/movie/${pelicula.movie_id}?language=es-ES`
                        const options = {
                            method: 'GET',
                            headers: {
                              accept: 'application/json',
                              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2EzMWVkZGFiNjE0OGVhNWM1ODY1YWQ5NWZmMWQ4MSIsInN1YiI6IjY1ZTRlNDcyMjBlNmE1MDE2MzUxZjQzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IRKLCdBV7SK2KvzvVrlIPar4DjLApqE4RboCW99658'
                            }
                          };
                        fetch(url, options)
                        .then(response => response.json())
                        .then(data => {
                            resultados.innerHTML+=`
                            <div id="movie">
                                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}"/>
                                <div id="movie-info">
                                    <h3>${data.title}</h3>
                                    <span class="${getColor(data.vote_average)}">${data.vote_average.toFixed(1)}</span>
                                </div>
                                <div id="overview">
                                <h3>Descripción:</h3>
                                <p>${data.overview}</p>
                                </div>
                            </div>
                            `
                        })
                    });
                    })
                    .catch((error)=>console.error('Error:', error))

            
                
            }).catch(()=>{
                console.log('Error')
                // msgAlert.innerHTML=`
                //     <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
                //         <strong>No tienes pareja agrega una</strong>
                //         <a href="./perfil.php" class="btn btn-primary mr-2">Agregar Pareja</a>
                //         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                //     </div>`
            })
    }
    function getColor(vote){
        if(vote>=7.5) {
            return "green";
        } else if (vote >=5 ){
            return "orange"
        }else{
            return "red";
        }
    }
}else{
    localStorage.removeItem('token');        
    localStorage.removeItem('username');    
    // document.getElementById('alert').innerHTML=  `
    // <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
    //     <strong>No tiene sesión iniciada</strong>
    //     <a href="./login.php" class="btn btn-primary mr-2">Login</a>
    //     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    // </div>`  
    document.getElementById('alert').innerHTML=`
    <div class="container-fluid bg-light p-5 text-center">
    <h1>No has iniciado sesión</h1>
    <p>Inicia sesión para acceder al contenido.</p>
    <a href="./login.php" id="irLogin" class="btn btn-primary">Iniciar sesión</a>
    </div>`
}