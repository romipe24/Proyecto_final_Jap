document.addEventListener("DOMContentLoaded", function(){
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


});


 // Modo oscuro
 document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');

    // Cambiar el texto del botón
    const button = document.getElementById('toggle-dark-mode');
    if (document.body.classList.contains('bg-dark')) {
      button.textContent = 'Modo Claro';
    } else {
      button.textContent = 'Modo Oscuro';
    }
  });