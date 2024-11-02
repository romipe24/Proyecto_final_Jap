// Cargar los productos del localStorage
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElementUSD = document.getElementById('totalUSD');
const totalElementUYU = document.getElementById('totalUYU');

// Función para convertir precios del formato con punto decimal a número entero
const convertPrice = (price) => {
    if (typeof price === 'string') {
        return parseFloat(price.replace(/\./g, ''));
    }
    return price;
};

// Función para formatear números con comas
const formatNumber = (num) => {
    return num.toLocaleString();
};

if (cartProducts.length > 0) {
    let total = 0;
    // Mostrar cada producto en el carrito
    cartProducts.forEach((product, index) => {
        // Convertir el precio al cargar el producto
        product.price = convertPrice(product.price);

        // Función para actualizar el subtotal y el total
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

            // Mostrar/ocultar el total en USD
            if (subtotalUSD > 0) {
                totalElementUSD.textContent = `Total USD ${formatNumber(subtotalUSD.toFixed(2))}`;
                totalElementUSD.style.display = 'block'; // Mostrar el total en USD
            } else {
                totalElementUSD.style.display = 'none'; // Ocultar el total en USD
            }

            // Mostrar/ocultar el total en UYU
            if (subtotalUYU > 0) {
                totalElementUYU.textContent = `Total UYU ${formatNumber(subtotalUYU.toFixed(2))}`;
                totalElementUYU.style.display = 'block'; // Mostrar el total en UYU
            } else {
                totalElementUYU.style.display = 'none'; // Ocultar el total en UYU
            }
        };

        // Crear un div para el producto
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
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button" id="decrease-${index}">-</button>
                    </div>
                    <input type="text" class="form-control text-center" id="quantity-${index}" value="${product.quantity}" readonly>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="increase-${index}">+</button>
                    </div>
                </div>
                <button class="btn btn-danger" id="remove-${index}"> <i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        // Añadir el producto al contenido del carrito
        cartContent.appendChild(productDiv);

        // Actualizar subtotal y total al cargar el producto
        updateTotal();

        // Función para aumentar y disminuir la cantidad
        const increaseButton = document.getElementById(`increase-${index}`);
        const decreaseButton = document.getElementById(`decrease-${index}`);
        const quantityInput = document.getElementById(`quantity-${index}`);

        increaseButton.addEventListener('click', function () {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            product.quantity = quantity;
            quantityInput.value = quantity;
            document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${formatNumber((product.price * quantity).toFixed(2))}`;
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts)); // Guardar cambios en localStorage
            updateTotal();
        });

        decreaseButton.addEventListener('click', function () {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                product.quantity = quantity;
                quantityInput.value = quantity;
                document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${formatNumber((product.price * quantity).toFixed(2))}`;
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts)); // Guardar cambios en localStorage
                updateTotal();
            }
        });

        // Eliminar producto del carrito
        document.getElementById(`remove-${index}`).addEventListener('click', function () {
            cartProducts.splice(index, 1);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            window.location.reload();
        });
    });
} else {
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElementUSD.textContent = ''; // Limpiar el total si el carrito está vacío
}

// Vaciar carrito
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', function () {
    // Vaciar el localStorage y actualizar la vista
    localStorage.removeItem('cartProducts');
    cartProducts.length = 0; // Limpiar el array de productos
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElementUSD.textContent = ''; // Limpiar total en USD
    totalElementUYU.textContent = ''; // Limpiar total en UYU
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