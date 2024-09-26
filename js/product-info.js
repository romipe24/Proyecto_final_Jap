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


// Manejo del formulario de reseñas
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

// Cargar reseñas almacenadas al cargar la página
cargarReseñas();

// Evento para manejar el envío de la reseña
reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const message = document.getElementById('review-message').value;
    const rating = document.getElementById('review-rating').value;
    const date = new Date().toLocaleDateString(); // Fecha actual

    // Crear la cantidad de estrellas como emojis
    let stars = '⭐'.repeat(rating);

    // Crear la reseña en el DOM
    const reviewHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${username}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Puntuación: ${stars} </h6>
                <p class="card-text">${message}</p>
                <p class="text-muted">Enviado el: ${date}</p>
            </div>
        </div>
    `;

    reviewsList.innerHTML += reviewHTML;

    // Guardar la reseña en el localStorage
    guardarReseña(username, message, rating, date);

    // Limpiar el formulario
    reviewForm.reset();
});

// Función para cargar reseñas almacenadas
function cargarReseñas() {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.forEach(res => {
        const reviewHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${res.username}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Puntuación: ${res.rating} Estrellas</h6>
                    <p class="card-text">${res.message}</p>
                    <p class="text-muted">Enviado el: ${res.date}</p>
                </div>
            </div>
        `;
        reviewsList.innerHTML += reviewHTML;
    });
}

// Función para guardar una reseña en localStorage
function guardarReseña(username, message, rating, date) {
    const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.push({ username, message, rating, date });
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
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