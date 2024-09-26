document.addEventListener("DOMContentLoaded", function() {
    // Manejo del formulario de calificaciones
    document.getElementById('form-rating').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const comment = document.getElementById('comment').value;
      const ratingValue = document.getElementById('rating').value;
  
      // Crear un nuevo div para la calificación
      const newRating = document.createElement('div');
      newRating.classList.add('rating');
      newRating.innerHTML = `
        <strong>${username}</strong> <span class="date">${new Date().toLocaleDateString()}</span>
        <p>${comment}</p>
        <p>Calificación: ${'⭐'.repeat(ratingValue)}</p>
      `;
  
      // Agregar la nueva calificación a la lista
      document.getElementById('ratings-list').appendChild(newRating);
  
      // Limpiar el formulario
      document.getElementById('form-rating').reset();
    });
  
    // Aquí puedes agregar el código existente para cargar el producto
    const productId = localStorage.getItem('selectedProductId');
    const catID = localStorage.getItem('catID');
  
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
    }
  
    function mostrarProducto(product, catID) {
      const productDetailContainer = document.getElementById('product-detail');
  
      productDetailContainer.innerHTML = `
        <div class="container my-5">
          <div class="row">
            <div class="col-md-6">
              <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="col-md-6">
              <p class="text-muted">Categorías / Autos</p>
              <h2>${product.name}</h2>
              <span class="badge bg-success mb-3">Disponible</span>
              <h3 class="text-dark">U$S ${product.cost.toLocaleString()}</h3>
              <p class="text-muted">${product.soldCount} vendidos</p>
              <button class="btn btn-warning btn-lg w-100 mb-3">Comprar</button>
              <div class="accordion" id="productDescription">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      Descripción
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#productDescription">
                    <div class="accordion-body">${product.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4" id="gallery"></div>
        </div>
      `;
  
      generarGaleria(productId);
    }
  
    function generarGaleria(productId) {
      const gallery = document.getElementById('gallery');
      const numImages = 3;
  
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
  