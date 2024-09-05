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
       } else {
        window.location.href = 'redireccion_login.html';
       }


       // Marca que la alerta ya se ha mostrado en la sesión actual
       sessionStorage.setItem('confirmShown', 'true');

   };
   if (user) {
    document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
}
    //esto es para cuando le pongamos boton de cerrar sesion
    // document.getElementById('logoutButton').addEventListener('click', function() {
    //     // Eliminar la sesión de LocalStorage
    //     localStorage.removeItem('user');

  


});


