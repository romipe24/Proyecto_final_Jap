// Cambiar foto de perfil
document.getElementById('btn-cambiar-foto').addEventListener('click', function () {
  document.getElementById('input-foto-perfil').click();
});

document.getElementById('input-foto-perfil').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
      const imageSrc = e.target.result;
      document.getElementById('preview-foto').src = imageSrc; // Muestra la imagen seleccionada
      localStorage.setItem('perfilFoto', imageSrc); // Guardar imagen en localStorage
  };

  if (file) {
      reader.readAsDataURL(file);
  }
});

// Cargar la imagen desde localStorage al cargar la página
window.onload = function () {
  const savedFoto = localStorage.getItem('perfilFoto');
  if (savedFoto) {
      document.getElementById('preview-foto').src = savedFoto; // Cargar la imagen guardada
  }
};

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
  document.getElementById('user-name').textContent = `Bienvenid@, ${user}`; // Saludo al usuario

  // Llenar campo de email automáticamente
  const emailInput = document.getElementById('email');
  emailInput.value = ` ${user}`; // Colocar el nombre del usuario en el campo de nombre
  emailInput.disabled = true; // Deshabilitar el campo para que no sea editable

  // Cargar datos de perfil si ya existen en localStorage
  const profileData = JSON.parse(localStorage.getItem('profileData'));

  if (profileData) {
      // Rellenar los campos con los datos guardados
      document.getElementById('nombre').value = profileData.nombre || '';
      document.getElementById('segundo-nombre').value = profileData.segundoNombre || '';
      document.getElementById('apellido').value = profileData.apellido || '';
      document.getElementById('segundo-apellido').value = profileData.segundoApellido || '';
      document.getElementById('telefono').value = profileData.telefono || '';
  }
}

// Almacenar datos en localStorage al guardar el formulario
document.getElementById('profile-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener valores de los campos
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const email = document.getElementById('email').value.trim();

  // Validar campos obligatorios
  if (!nombre || !apellido || !email) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
  }

  // Guardar datos en localStorage
  const profileData = {
      nombre: nombre,
      segundoNombre: document.getElementById('segundo-nombre').value.trim(),
      apellido: apellido,
      segundoApellido: document.getElementById('segundo-apellido').value.trim(),
      email: email,
      telefono: document.getElementById('telefono').value.trim(),
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));


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

  alert('Datos guardados con éxito');

});

// Función para el modo oscuro
const toggleDarkMode = document.getElementById('toggle-dark-mode');

toggleDarkMode.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
});




// Cargar estado del modo oscuro desde localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
  document.body.classList.add('dark-mode');
}
