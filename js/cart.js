// Cargar el producto del localStorage
const product = JSON.parse(localStorage.getItem('cartProduct'));
const cartContent = document.getElementById('cart-content');
const totalElement = document.getElementById('total'); // Elemento donde se mostrará el total

if (product) {
  // Función para actualizar el subtotal y el total
  const updateTotal = (quantity) => {
    const subtotal = product.price * quantity;
    document.getElementById('subtotal').textContent = `${product.currency} ${subtotal.toFixed(2)}`;
    
    // Actualizamos el total con la misma lógica si tienes varios productos, podrías hacer un bucle aquí.
    totalElement.textContent = `${product.currency} ${subtotal.toFixed(2)}`;
  };

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

  // Establecer el valor inicial del total al cargar el producto
  updateTotal(product.quantity);

  // Actualizar subtotal y total en tiempo real cuando el usuario cambia la cantidad
  document.getElementById('quantity').addEventListener('input', function () {
    const quantity = parseInt(this.value);
    updateTotal(quantity);
  });
} else {
  cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
  totalElement.textContent = ''; // Limpiar el total si el carrito está vacío
}
