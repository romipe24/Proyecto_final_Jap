// Cargar los productos del localStorage
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElement = document.getElementById('total');

if (cartProducts.length > 0) {
    let total = 0;

    // Mostrar cada producto en el carrito
    cartProducts.forEach((product, index) => {
        // Función para actualizar el subtotal y el total
        const updateTotal = (quantity) => {
            const subtotal = product.price * quantity;
            document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${subtotal.toFixed(2)}`;

            // Actualizamos el total
            total += subtotal;
            totalElement.textContent = `${product.currency} ${total.toFixed(2)}`;
        };

        cartContent.innerHTML += `
            <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="col-md-8">
                <h3>${product.name}</h3>
                <p>Precio: ${product.currency} ${product.price}</p>
                <label>Cantidad:</label>
                <input type="number" id="quantity-${index}" value="${product.quantity}" min="1" class="form-control w-25">
                <p class="mt-3">Subtotal: <span id="subtotal-${index}">${product.currency} ${product.price}</span></p>
            </div>
        `;

        // Establecer el valor inicial del total al cargar el producto
        updateTotal(product.quantity);

        // Actualizar subtotal y total en tiempo real cuando el usuario cambia la cantidad
        document.getElementById(`quantity-${index}`).addEventListener('input', function () {
            const quantity = parseInt(this.value);
            updateTotal(quantity);
        });
    });
} else {
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElement.textContent = ''; // Limpiar el total si el carrito está vacío
}
