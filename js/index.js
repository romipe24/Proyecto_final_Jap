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


    // Verificar si el usuario está autenticado
    const user = localStorage.getItem('user');

    // Verificar si ya se mostró la alerta
    const alertShown = localStorage.getItem('alertShown');


    if (!user && !alertShown) {
        const wantsToLogin = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');

        if (wantsToLogin) {
            // Redirigir al login si el usuario desea iniciar sesión
            window.location.href = 'login.html';
        } 

    };
    //esto es para cuando le pongamos boton de cerrar sesion
    // document.getElementById('logoutButton').addEventListener('click', function() {
    //     // Eliminar la sesión de LocalStorage
    //     localStorage.removeItem('user');

  


});
