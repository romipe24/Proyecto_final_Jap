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
                  mostrarProducto(product, catID);
              }
          })
          .catch(error => console.error("Error al obtener el producto:", error));
  } else {
      console.error("No se encontró el ID del producto.");
  }


function mostrarProducto(product, catID) {
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
          <div class="row mt-4" id="gallery"></div>
      </div>
  `;

  // Llamar a la función para generar la galería de imágenes
  generarGaleria(productId);
}

function generarGaleria(productId) {
  const gallery = document.getElementById('gallery');
  const numImages = 3; // Número de imágenes que quieres mostrar (prodX_2, prodX_3, prodX_4)

  for (let i = 2; i <= numImages + 1; i++) {
      const img = document.createElement("img");
      img.src = `img/prod${productId}_${i}.jpg`;
      img.classList.add("img-fluid", "rounded");

      const col = document.createElement("div");
      col.classList.add("col-4");
      col.appendChild(img);
      gallery.appendChild(col);
  }
}

// Mostrar el nombre del usuario en el navbar si está autenticado
document.addEventListener('DOMContentLoaded', function() {
  const user = localStorage.getItem('user');
  
  if (user) {
      document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
  } else {
      const confirmShown = sessionStorage.getItem('confirmShown');
      if (!confirmShown) {
          const userConfirmed = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');
          if (userConfirmed) {
              window.location.href = 'login.html';
          }
          sessionStorage.setItem('confirmShown', 'true');
      }
  }
});
});