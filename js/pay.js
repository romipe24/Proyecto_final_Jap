

// ** Verificación de sesión de usuario**
const user = localStorage.getItem('user');
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

// Cargar los productos del localStorage
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElementUSD = document.getElementById('totalUSD');
const totalElementUYU = document.getElementById('totalUYU');
const cartBadge = document.getElementById('cart-badge');

// Función para convertir precios del formato con punto decimal a número entero
const convertPrice = (price) => {
    return typeof price === 'string' ? parseFloat(price.replace(/\./g, '')) : price;
};

// Función para formatear números con comas
const formatNumber = (num) => num.toLocaleString();

// Función para actualizar el badge del carrito
const updateCartBadge = () => {
    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);
    cartBadge.textContent = totalQuantity;
};

// Actualizar el badge cuando se cargue la página
updateCartBadge();

if (cartProducts.length > 0) {
    cartProducts.forEach((product, index) => {
        product.price = convertPrice(product.price);

        const productDiv = document.createElement('div');
        productDiv.className = "cart-item";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="img-fluid mx-auto d-block mb-2">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                  <p>Cantidad: ${product.quantity}</p>
                <p>Precio: ${product.currency} ${product.price}</p>
              
            </div>
        `;

        cartContent.appendChild(productDiv);
    });
}

// ** Costos en tiempo real**
const shippingTypeElement = document.getElementById('shippingType');
const subtotalElement = document.getElementById('subtotal');
const shippingCostElement = document.getElementById('shippingCost');

// Actualiza los costos (Subtotal, Envío y Total)
const updateCosts = () => {
    let subtotalUSD = 0;
    let subtotalUYU = 0;

    cartProducts.forEach(product => {
        if (product.currency === 'USD') {
            subtotalUSD += product.price * product.quantity;
        } else if (product.currency === 'UYU') {
            subtotalUYU += product.price * product.quantity;
        }
    });

    // Actualizamos el subtotal
    document.getElementById('subtotalUSD').textContent = `USD ${formatNumber(subtotalUSD.toFixed(2))}`;
    document.getElementById('subtotalUYU').textContent = `UYU ${formatNumber(subtotalUYU.toFixed(2))}`;

    // Cálculo del costo de envío basado en el tipo de envío seleccionado
    let shippingCostUSD = 0;
    let shippingCostUYU = 0;
    const shippingType = shippingTypeElement.value;
    if (shippingType === 'premium') {
        shippingCostUSD = subtotalUSD * 0.15; // 15% de costo adicional
        shippingCostUYU = subtotalUYU * 0.15; 
    } else if (shippingType === 'express') {
        shippingCostUSD = subtotalUSD * 0.07; // 7% de costo adicional
        shippingCostUYU = subtotalUYU * 0.07; 
    } else if (shippingType === 'standard') {
        shippingCostUSD = subtotalUSD * 0.05; // 5% de costo adicional
        shippingCostUYU = subtotalUYU * 0.05; 
    }

    document.getElementById('shippingCostUSD').textContent = `USD ${formatNumber(shippingCostUSD.toFixed(2))}`;
    document.getElementById('shippingCostUYU').textContent = `UYU ${formatNumber(shippingCostUYU.toFixed(2))}`;

    // Calculamos el total
    const totalCostUSD = subtotalUSD + shippingCostUSD;
    document.getElementById('totalCostUSD').textContent = `USD ${formatNumber(totalCostUSD.toFixed(2))}`;
    totalElementUSD.textContent = `Total USD: ${formatNumber(totalCostUSD.toFixed(2))}`;

    const totalCostUYU = subtotalUYU + shippingCostUYU;
    document.getElementById('totalCostUYU').textContent = `UYU ${formatNumber(totalCostUYU.toFixed(2))}`;
    totalElementUYU.textContent = `Total UYU: ${formatNumber(totalCostUYU.toFixed(2))}`;
};

// Actualizar los costos al cambiar el tipo de envío
shippingTypeElement.addEventListener('change', updateCosts);

// Actualizamos los costos cuando se cargue la página
if (cartProducts.length > 0) {
    updateCosts();
}

// ** Mostrar y Ocultar Formulario de Pago **
document.addEventListener('DOMContentLoaded', function() {
    var paymentMethod = document.getElementById('paymentMethod');
    var creditCardForm = document.getElementById('creditCardForm');
    var bankTransferForm = document.getElementById('bankTransferForm');

    // Mostrar formulario de tarjeta de crédito por defecto
    creditCardForm.style.display = 'block';
    bankTransferForm.style.display = 'none';

    paymentMethod.addEventListener('change', function() {
        if (paymentMethod.value === 'creditCard') {
            creditCardForm.style.display = 'block';
            bankTransferForm.style.display = 'none';
        } else if (paymentMethod.value === 'bankTransfer') {
            creditCardForm.style.display = 'none';
            bankTransferForm.style.display = 'block';
        }
    });
});

// ** Finalizar Compra y Validación de Pago**
// Variable para rastrear si el botón "direccion" fue clickeado
let addressSubmitted = false;

 // Agregar evento al botón de guardar dirección
 document.getElementById("direccion").addEventListener("click", function () {
    event.preventDefault();
    // Obtener valores de los campos del formulario
    const department = document.getElementById("department").value.trim();
    const locality = document.getElementById("locality").value.trim();
    const street = document.getElementById("street").value.trim();
    const number = document.getElementById("number").value.trim();
    const corner = document.getElementById("corner").value.trim();

    // Validar que todos los campos estén completos
    if (!department || !locality || !street || !number || !corner) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear un objeto con los datos
    const shippingAddress = {
        department,
        locality,
        street,
        number,
        corner,
    };

    // Guardar el objeto en localStorage
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

    // Mostrar una alerta de éxito
    alert("Dirección guardada correctamente.");
    addressSubmitted = true;
});

// Evento del botón "finalizePurchase"
document.getElementById("finalizePurchase").addEventListener("click", function() {
    // Verificar si el botón "direccion" fue clickeado
    if (!addressSubmitted) {
        alert('Por favor, confirma primero tu dirección de envío.');
        return;
    }

    const chexboxEnvio = document.getElementById("aceptarEnvio");
    if (!chexboxEnvio.checked){
        alert("Confirme el metodo de envio");
        return;
    }

    var paymentMethod = document.getElementById('paymentMethod').value;

    if (paymentMethod === 'creditCard') {
        var cardNumber = document.getElementById('cardNumber').value;
        var cvv = document.getElementById('cvv').value;
        var expiryDate = document.getElementById('expiryDate').value;
        var [expiryMonth, expiryYear] = expiryDate.split('/').map(Number);

        var currentYear = new Date().getFullYear() % 100;
        var currentMonth = new Date().getMonth() + 1;

        if (!cardNumber || !cvv || !expiryDate) {
            alert('Por favor, completa todos los campos de la tarjeta de crédito.');
            return;
        }

        if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
            alert('Fecha de vencimiento no válida.');
            return;
        }
    }

    alert('Compra finalizada. ¡Gracias por tu compra!');
    // Vaciar carrito
        localStorage.removeItem('cartProducts');
        cartProducts = [];
        cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
        totalElementUSD.textContent = '';
        totalElementUYU.textContent = '';
       updateCartBadge(); // Actualizar el badge
       updateCosts();
    //Rederigir al inicio
        window.location.href = "index.html";
});



