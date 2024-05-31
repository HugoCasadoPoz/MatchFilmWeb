const url = "http://localhost/matchfilmWeb/api/get_token.php";
const token = localStorage.getItem('token');  // Asegúrate de que el token está correctamente almacenado en localStorage
let like = document.getElementById('like');

if (token) {
fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.text().then(text => {
        try {
            return JSON.parse(text);
        } catch (error) {
            console.error('Error al parsear JSON:', error, text);
            throw error;
        }
    });
})
.then(data => {
    console.log('Respuesta:', data);
    buscar()
})
.catch(error => {
    console.error('Hubo un problema con la solicitud:', error);
});

function buscar(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2EzMWVkZGFiNjE0OGVhNWM1ODY1YWQ5NWZmMWQ4MSIsInN1YiI6IjY1ZTRlNDcyMjBlNmE1MDE2MzUxZjQzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IRKLCdBV7SK2KvzvVrlIPar4DjLApqE4RboCW99658'
        }
      };
      fetch('https://api.themoviedb.org/3/movie/popular?language=es-ES&page='+Math.floor(Math.random() * 20), options)
      .then(response => 
            response.json()
        )
        .then(response => {
            document.getElementById('nota').classList.remove();
            let numPeli = Math.floor(Math.random() * 20);
            console.log(response.results[numPeli]);
            document.getElementById('linkImagen').src = 'https://image.tmdb.org/t/p/w500' + response.results[numPeli].poster_path
            document.getElementById('titulo').innerHTML = response.results[numPeli].title;
            document.getElementById('descripcion').innerHTML = response.results[numPeli].overview;
            document.getElementById('nota').innerHTML = response.results[numPeli].vote_average.toFixed(1);
            document.getElementById("nota").classList.remove(color)
            color=getColor(response.results[numPeli].vote_average)
            document.getElementById('nota').classList.add(color);
            movie_id=response.results[numPeli].id;
            movie_id=response.results[numPeli].id;
        })
        .catch(err => 
            console.error(err)
        );


}
}else {
    console.error('Token no encontrado en localStorage');
}
function getColor(vote){
    if(vote >= 7.5) {
        return "green";
    } else if (vote >=5 ){
        return "orange"
    }else{
        return "red";
    }
}