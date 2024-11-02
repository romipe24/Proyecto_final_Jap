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

// Actualizar el badge al cargar la página
document.addEventListener('DOMContentLoaded', updateCartBadge);
