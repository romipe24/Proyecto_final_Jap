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
// Este script debe ejecutarse una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
   const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
   
   // Calcular la cantidad total de productos
   const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);

   // Actualizar el contenido del badge
   document.getElementById('cart-badge').textContent = totalQuantity;
});