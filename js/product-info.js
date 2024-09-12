
document.addEventListener("DOMContentLoaded", function() {
    const productId = localStorage.getItem('selectedProductId');
    const catID = localStorage.getItem('catID'); // Obtener el catID desde el localStorage para formar la URL

    if (productId && catID) {
        const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        fetch(DATA_URL)
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id == productId);
                if (product) {
                    mostrarProducto(product);
                }
            })
            .catch(error => console.error("Error al obtener el producto:", error));
    } else {
        console.error("No se encontró el ID del producto.");
    }
});

function mostrarProducto(product) {
    const productDetailContainer = document.getElementById('product-detail');

    productDetailContainer.innerHTML = `
        <div class="container my-5">
  <div class="row">
    <!-- Columna de la imagen principal -->
    <div class="col-md-6">
      <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
    </div>

    <!-- Columna de detalles del producto -->
    <div class="col-md-6">
      <p class="text-muted">Categorías / Autos</p>
      <h2>${product.name}</h2>
      <span class="badge bg-success mb-3">Disponible</span>
      <h3 class="text-dark">U$S ${product.cost.toLocaleString()}</h3>
      <p class="text-muted">${product.soldCount} vendidos</p>

      <!-- Botón de compra -->
      <button class="btn btn-warning btn-lg w-100 mb-3">Comprar</button>

      <!-- Descripción del producto en colapsable -->
      <div class="accordion" id="productDescription">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Descripción
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#productDescription">
            <div class="accordion-body">
              ${product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Galería de imágenes pequeñas debajo de la imagen principal -->
  <div class="row mt-4">
    <div class="col-4">
      <img src="img/small_image1.jpg" class="img-fluid rounded">
    </div>
    <div class="col-4">
      <img src="img/small_image2.jpg" class="img-fluid rounded">
    </div>
    <div class="col-4">
      <img src="img/small_image3.jpg" class="img-fluid rounded">
    </div>
  </div>
</div>

    `;
}

const catTitle = localStorage.getItem('catName');




document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem('user');
    
    if (user) {
        // Si el usuario está autenticado, mostrar el nombre en el navbar
        document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
    } else {
        // Redirigir al login si el usuario no está autenticado
        const confirmShown = sessionStorage.getItem('confirmShown');
        if (!confirmShown) {
            const userConfirmed = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');
            
            if (userConfirmed) {
                window.location.href = 'login.html';
            }
            
            // Marca que la alerta ya se ha mostrado
            sessionStorage.setItem('confirmShown', 'true');
        }
    }
});
