// Cargar los productos del localStorage
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElement = document.getElementById('total');

if (cartProducts.length > 0) {
    let total = 0;

    // Mostrar cada producto en el carrito
    cartProducts.forEach((product, index) => {
        // Función para actualizar el subtotal y el total
        const updateTotal = () => {
            let subtotal = 0;
            cartProducts.forEach(product => {
                subtotal += product.price * product.quantity;
            });
            totalElement.textContent = `${product.currency} ${subtotal.toFixed(2)}`;
        };
// Crear un div para el producto
const productDiv = document.createElement('div');
productDiv.className = "row border rounded p-3 mb-3 align-items-center shadow-sm"; // Clase de Bootstrap para formato

productDiv.innerHTML = `
    <div class="col-md-2 text-center">
        <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
    </div>
    <div class="col-md-4">
        <h5 class="mb-1">${product.name}</h5>
    </div>
    <div class="col-md-2 text-center d-flex align-items-center justify-content-center">
        <button class="btn btn-outline-secondary btn-sm" id="decrease-${index}">-</button>
        <input type="number" id="quantity-${index}" value="${product.quantity}" min="1" class="form-control form-control-sm text-center w-50 mx-2">
        <button class="btn btn-outline-secondary btn-sm" id="increase-${index}">+</button>
    </div>
    <div class="col-md-2 text-center">
        <p class="mb-0">${product.currency} ${product.price}</p>
    </div>
    <div class="col-md-2 text-center">
        <button class="btn btn-outline-danger btn-sm" id="remove-${index}">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;

// Agregar el producto al contenedor del carrito
document.getElementById("cart-content").appendChild(productDiv);

        // Actualizar subtotal y total al cargar el producto
        updateTotal();

        // Actualizar subtotal y total en tiempo real cuando el usuario cambia la cantidad
        document.getElementById(`quantity-${index}`).addEventListener('input', function () {
            const quantity = parseInt(this.value);
            product.quantity = quantity;
            document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${(product.price * quantity).toFixed(2)}`;
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
