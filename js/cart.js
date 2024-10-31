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
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', function () {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        localStorage.removeItem('cartProducts'); // Limpiar el localStorage
        cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`; // Actualizar contenido
        totalElement.textContent = ''; // Limpiar el total
        alert('Carrito vaciado con éxito.');
    }
  });
// Este script debe ejecutarse una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    
    // Calcular la cantidad total de productos
    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);

    // Actualizar el contenido del badge
    document.getElementById('cart-badge').textContent = totalQuantity;
});