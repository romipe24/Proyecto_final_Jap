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

 };
 if (user) {
  document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
}
  //esto es para cuando le pongamos boton de cerrar sesion
  // document.getElementById('logoutButton').addEventListener('click', function() {
  //     // Eliminar la sesión de LocalStorage
  //     localStorage.removeItem('user');