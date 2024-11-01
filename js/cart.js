// Cargar los productos del localStorage
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElementUSD = document.getElementById('totalUSD');
const totalElementUYU = document.getElementById('totalUYU');

if (cartProducts.length > 0) {
    let total = 0;

    // Mostrar cada producto en el carrito
    cartProducts.forEach((product, index) => {
        // Función para actualizar el subtotal y el total
        const updateTotal = () => {
            let subtotalUSD = 0;
            let subtotalUYU = 0;

            cartProducts.forEach(product => {
                if(product.currency === 'USD'){
                subtotalUSD += product.price * product.quantity;
                } else if (product.currency === 'UYU') {
                subtotalUYU += product.price * product.quantity;
                }
            });
           // Mostrar/ocultar el total en USD
            if (subtotalUSD > 0) {
                totalElementUSD.textContent = `Total USD ${subtotalUSD.toFixed(2)}`;
                totalElementUSD.style.display = 'block'; // Mostrar el total en USD
            } else {
                totalElementUSD.style.display = 'none'; // Ocultar el total en USD
            }

            // Mostrar/ocultar el total en UYU
            if (subtotalUYU > 0) {
                totalElementUYU.textContent = `Total UYU ${subtotalUYU.toFixed(2)}`;
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
                <input type="number" id="quantity-${index}" value="${product.quantity}" min="1" class="form-control">
                <button class="btn btn-danger" id="remove-${index}"> <i class="fas fa-trash-alt"></i></button>
            </div>
            `;

        // Añadir el producto al contenido del carrito
        cartContent.appendChild(productDiv);

        // Actualizar subtotal y total al cargar el producto
        updateTotal();

        // Actualizar subtotal y total en tiempo real cuando el usuario cambia la cantidad
        document.getElementById(`quantity-${index}`).addEventListener('input', function () {
            const quantity = parseInt(this.value);
            product.quantity = quantity;
            document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${(product.price * quantity).toFixed(2)}`;
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts)); // Guardar cambios en localStorage
            updateTotal();
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
    totalElement.textContent = ''; // Limpiar el total si el carrito está vacío
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