// Cargar los productos del localStorage
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElement = document.getElementById('total');

if (cartProducts.length > 0) {
    let total = 0;

    // Función para actualizar el subtotal y el total
    const updateTotal = () => {
        let subtotal = 0;
        cartProducts.forEach(product => {
            subtotal += product.price * product.quantity;
        });
        totalElement.textContent = `${cartProducts[0].currency} ${subtotal.toFixed(2)}`;
    };

    // Mostrar cada producto en el carrito
    cartProducts.forEach((product, index) => {
        // Crear un div para el producto
        const productDiv = document.createElement('div');
        productDiv.className = "col-md-12";
        productDiv.innerHTML = `
            <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="col-md-8">
                <h3>${product.name}</h3>
                <p>Precio: ${product.currency} ${product.price}</p>
                <label>Cantidad:</label>
                <input type="number" id="quantity-${index}" value="${product.quantity}" min="1" class="form-control w-25">
                <p class="mt-3">Subtotal: <span id="subtotal-${index}">${product.currency} ${(product.price * product.quantity).toFixed(2)}</span></p>
                <button class="btn btn-danger" id="remove-${index}">Eliminar</button>
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
