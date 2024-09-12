//const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
// Recuperar el identificador de la categoría del almacenamiento local
const catID = localStorage.getItem('catID');
const catTitle = localStorage.getItem('catName');
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;



document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem('user');
    
    if (user) {
        // Si el usuario está autenticado, mostrar el nombre en el navbar
        document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
    } else {
        // Redirigir al login si el usuario no está autenticado
        const confirmShown = sessionStorage.getItem('confirmShown');
        if (!confirmShown) {
            const userConfirmed = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');
            
            if (userConfirmed) {
                window.location.href = 'login.html';
            }
            
            // Marca que la alerta ya se ha mostrado
            sessionStorage.setItem('confirmShown', 'true');
        }
    }
});