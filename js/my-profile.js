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

  // Cambiar la foto de perfil (previsualización)
document.getElementById('foto-perfil').addEventListener('change', function (e) {
  const preview = document.getElementById('preview-foto');
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Alternar entre Modo Día/Noche
document.getElementById('modo').addEventListener('change', function () {
  document.body.classList.toggle('bg-dark', this.checked);
  document.body.classList.toggle('text-white', this.checked);
});
