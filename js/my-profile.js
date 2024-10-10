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
    alert('Datos guardados correctamente.');
});

// Sección foto de perfil
// Obtener elementos del DOM
const inputFoto = document.getElementById('input-foto-perfil');
const fotoPrevia = document.getElementById('preview-foto');
const btnCambiarFoto = document.getElementById('btn-cambiar-foto');

// Función para convertir la imagen seleccionada en Base64
function leerImagenComoBase64(archivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(archivo);
    });
}

// Evento para cambiar la foto de perfil
btnCambiarFoto.addEventListener('click', function () {
    inputFoto.click();
});

// Cambiar la foto de perfil (previsualización)
inputFoto.addEventListener('change', function (e) {
    const archivo = e.target.files[0];

    if (archivo) {
        leerImagenComoBase64(archivo).then(base64 => {
            fotoPrevia.src = base64; // Actualiza la imagen de previsualización
        }).catch(error => {
            console.error('Error al leer la imagen:', error);
        });
    }
});

// Funcionalidad de Modo Día / Modo Noche
const toggleButton = document.getElementById('toggle-dark-mode');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Opcional: guardar la preferencia del usuario
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Cargar preferencia guardada al iniciar
window.onload = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
};