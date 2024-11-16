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
    let total = 0;

    cartProducts.forEach((product, index) => {
        product.price = convertPrice(product.price);

        const updateTotal = () => {
            let subtotalUSD = 0;
            let subtotalUYU = 0;
            cartProducts.forEach(product => {
                if (product.currency === 'USD') {
                    subtotalUSD += product.price * product.quantity;
                } else if (product.currency === 'UYU') {
                    subtotalUYU += product.price * product.quantity;
                }
            });

            totalElementUSD.style.display = subtotalUSD > 0 ? 'block' : 'none';
            totalElementUSD.textContent = `Total USD ${formatNumber(subtotalUSD.toFixed(2))}`;
            totalElementUYU.style.display = subtotalUYU > 0 ? 'block' : 'none';
            totalElementUYU.textContent = `Total UYU ${formatNumber(subtotalUYU.toFixed(2))}`;
        };

        const productDiv = document.createElement('div');
        productDiv.className = "cart-item";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>Precio: ${product.currency} ${product.price}</p>
                <p>Subtotal: <span id="subtotal-${index}">${product.currency} ${(product.price * product.quantity).toFixed(2)}</span></p>
            </div>
            <div class="cart-actions">
                <div class="input-group">
                    <button class="btn btn-outline-secondary" type="button" id="decrease-${index}">-</button>
                    <input type="text" class="form-control text-center" id="quantity-${index}" value="${product.quantity}" readonly>
                    <button class="btn btn-outline-secondary" type="button" id="increase-${index}">+</button>
                </div>
                <button class="btn btn-danger" id="remove-${index}"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        cartContent.appendChild(productDiv);
        updateTotal();

        const increaseButton = document.getElementById(`increase-${index}`);
        const decreaseButton = document.getElementById(`decrease-${index}`);
        const quantityInput = document.getElementById(`quantity-${index}`);

        increaseButton.addEventListener('click', () => {
            product.quantity++;
            quantityInput.value = product.quantity;
            document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${formatNumber((product.price * product.quantity).toFixed(2))}`;
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            updateTotal();
            updateCartBadge(); // Actualizar el badge
        });

        decreaseButton.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
                quantityInput.value = product.quantity;
                document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${formatNumber((product.price * product.quantity).toFixed(2))}`;
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
                updateTotal();
                updateCartBadge(); // Actualizar el badge
            }
        });

        document.getElementById(`remove-${index}`).addEventListener('click', () => {
            cartProducts.splice(index, 1);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            window.location.reload(); // Recargar la página para refrescar el carrito
            updateCartBadge(); // Actualizar el badge
        });
    });
} else {
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElementUSD.textContent = '';
    totalElementUYU.textContent = '';
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cartProducts');
    cartProducts = [];
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElementUSD.textContent = '';
    totalElementUYU.textContent = '';
    updateCartBadge(); // Actualizar el badge
});

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
    const totalCost = subtotalUSD + shippingCostUSD;
    document.getElementById('totalCostUSD').textContent = `USD ${formatNumber(totalCost.toFixed(2))}`;
    totalElementUSD.textContent = `Total USD: ${formatNumber(totalCost.toFixed(2))}`;

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

// ** Finalizar Compra**
document.getElementById("finalizePurchase").addEventListener("click", function() {
    alert("Compra finalizada. ¡Gracias por tu compra!");
});

// ** Navegación de categorías**
document.getElementById("autos").addEventListener("click", function() {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
});
document.getElementById("juguetes").addEventListener("click", function() {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
});
document.getElementById("muebles").addEventListener("click", function() {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
});
document.getElementById("herramientas").addEventListener("click", function() {
    localStorage.setItem("catID", 104);
    window.location = "products.html";
});
document.getElementById("computadoras").addEventListener("click", function() {
    localStorage.setItem("catID", 105);
    window.location = "products.html";
});
document.getElementById("vestimenta").addEventListener("click", function() {
    localStorage.setItem("catID", 106);
    window.location = "products.html";
});
document.getElementById("electrodomesticos").addEventListener("click", function() {
    localStorage.setItem("catID", 107);
    window.location = "products.html";
});
document.getElementById("deporte").addEventListener("click", function() {
    localStorage.setItem("catID", 108);
    window.location = "products.html";
});
document.getElementById("celulares").addEventListener("click", function() {
    localStorage.setItem("catID", 109);
    window.location = "products.html";
});

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