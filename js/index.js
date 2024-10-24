document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos todas las tarjetas que tienen la clase 'custom-card'
    const cards = document.querySelectorAll('.custom-card');

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("herramientas").addEventListener("click", function() {
        localStorage.setItem("catID", 104);
        window.location = "products.html"
    });
    document.getElementById("computadoras").addEventListener("click", function() {
        localStorage.setItem("catID", 105);
        window.location = "products.html"
    });
    document.getElementById("vestimenta").addEventListener("click", function() {
        localStorage.setItem("catID", 106);
        window.location = "products.html"
    });
    document.getElementById("electrodomesticos").addEventListener("click", function() {
        localStorage.setItem("catID", 107);
        window.location = "products.html"
    });
    document.getElementById("deporte").addEventListener("click", function() {
        localStorage.setItem("catID", 108);
        window.location = "products.html"
    });
    document.getElementById("celulares").addEventListener("click", function() {
        localStorage.setItem("catID", 109);
        window.location = "products.html"
    });

    // Agregamos el evento a cada card para redirigir a products.html
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryId = card.getAttribute('data-cat-id');
            if (categoryId) {
                localStorage.setItem("catID", categoryId);
                window.location = "products.html";
            }
        });
    });

    // Verificar si el usuario está autenticado
    const user = localStorage.getItem('user');

    // Verificar si ya se mostró la alerta
    const confirmShown = sessionStorage.getItem('confirmShown');

    if (!user && !confirmShown) {
    // Muestra la alerta
    const userConfirmed = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');

    if (userConfirmed) {
        // Redirigir al login si el usuario desea iniciar sesión
        window.location.href = 'login.html';
    }else{
        window.location.href = 'redireccion_login.html';
    }

    // Marca que la alerta ya se ha mostrado en la sesión actual
    sessionStorage.setItem('confirmShown', 'true');
   }

    if (user) {
        // Cargar datos de perfil si ya existen en localStorage
        const profileData = JSON.parse(localStorage.getItem('profileData'));

        if (profileData) {
            // Mostrar el nombre guardado en la bienvenida
            document.getElementById('user-name').textContent = `Bienvenid@, ${profileData.nombre}`;
        } else {
            // Si no hay perfil guardado, mostrar el email como nombre
            document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
        }
    }
})