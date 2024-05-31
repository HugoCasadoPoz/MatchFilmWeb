const url = "http://localhost/matchfilmWeb/api/get_token.php";
const token = localStorage.getItem('token');  // Asegúrate de que el token está correctamente almacenado en localStorage

if (!token) {
    console.error('Token no encontrado en localStorage');
} else {
    console.log('Token encontrado:', token);
}

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
})
.catch(error => {
    console.error('Hubo un problema con la solicitud:', error);
});