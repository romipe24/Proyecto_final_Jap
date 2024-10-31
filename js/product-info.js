document.addEventListener("DOMContentLoaded", function() {
    const productId = localStorage.getItem('selectedProductId');
    const catID = localStorage.getItem('catID'); // Obtener el catID desde el localStorage para formar la URL
    const user = localStorage.getItem('user');
      
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
      
    // Función para mostrar el producto
    function mostrarProducto(product, catID) {
        const productDetailContainer = document.getElementById('product-detail');
      
        productDetailContainer.innerHTML = `
            <div class="container my-5">
                <div class="row">
                    <div class="col-md-6">
                        <img id="product-image" src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                    </div>
                    <div class="col-md-6">
                        <p class="text-muted">Categorías / Autos</p>
                        <h2 id="product-name">${product.name}</h2>
                        <span class="badge bg-success mb-3">Disponible</span>
                        <h3 id="product-price" class="text-dark">${product.currency} ${product.cost.toLocaleString()}</h3>
                        <p class="text-muted">${product.soldCount} vendidos</p>
                        <button id="buy-button" class="btn btn-warning btn-lg w-100 mb-3">Comprar</button>
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
                <div class="row mt-4" id="gallery"></div>
            </div>
        `;
        
        document.getElementById('buy-button').addEventListener('click', function () {
            const priceText = document.getElementById('product-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            const currency = product.currency || 'USD';

            const productComprar = {
                name: document.getElementById('product-name').textContent,
                price: price,
                currency: currency,
                quantity: 1, // Por defecto, cantidad 1
                image: document.getElementById('product-image').src
            };

            let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

            const existingProductIndex = cartProducts.findIndex(item => item.name === productComprar.name);

            if (existingProductIndex !== -1) {
                cartProducts[existingProductIndex].quantity += 1;
            } else {
                cartProducts.push(productComprar);
            }

            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            window.location.href = 'cart.html';
        });

        generarGaleria(productId);
        cargarProductosRelacionados(productId); // Llamar a la función para cargar productos relacionados
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

    function cargarProductosRelacionados(productId) {
        const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

        fetch(PRODUCT_URL)
            .then(response => response.json())
            .then(data => {
                const relatedProductsList = document.getElementById('related-products-list');
                relatedProductsList.innerHTML = '';

                if (data.relatedProducts && data.relatedProducts.length) {
                    data.relatedProducts.forEach(relatedProduct => {
                        const productItem = document.createElement('div');
                        productItem.classList.add('col-md-3', 'text-center');
                        productItem.innerHTML = `
                            <a href="#" data-products-id="${relatedProduct.id}">
                                <img src="${relatedProduct.image}" class="img-fluid" alt="${relatedProduct.name}">
                                <p>${relatedProduct.name}</p>
                            </a>
                        `;

                        productItem.querySelector('a').addEventListener('click', function () {
                            const productId = this.getAttribute('data-products-id');
                            localStorage.setItem('selectedProductId', productId);
                            window.location.href = 'product-info.html';
                        });
                        relatedProductsList.appendChild(productItem);
                    });
                } else {
                    relatedProductsList.innerHTML = '<p>No hay productos relacionados disponibles.</p>';
                }
            })
            .catch(error => console.error("Error al cargar productos relacionados:", error));
    }
});
