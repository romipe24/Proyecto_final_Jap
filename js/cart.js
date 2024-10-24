// Cargar el producto del localStorage
const product = JSON.parse(localStorage.getItem('cartProduct'));
const cartContent = document.getElementById('cart-content');

if (product) {
  cartContent.innerHTML = `
    <div class="col-md-4">
      <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
    </div>
    <div class="col-md-8">
      <h3>${product.name}</h3>
      <p>Precio: ${product.currency} ${product.price}</p>
      <label>Cantidad:</label>
      <input type="number" id="quantity" value="${product.quantity}" min="1" class="form-control w-25">
      <p class="mt-3">Subtotal: <span id="subtotal">${product.currency} ${product.price}</span></p>
    </div>
  `;

  // Actualizar subtotal en tiempo real
  document.getElementById('quantity').addEventListener('input', function () {
    const quantity = parseInt(this.value);
    const subtotal = product.price * quantity;
    document.getElementById('subtotal').textContent = `${product.currency} ${subtotal.toFixed(2)}`;
  });
} else {
  cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
}