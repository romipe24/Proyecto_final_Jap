//const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
// Recuperar el identificador de la categoría del almacenamiento local
const catID = localStorage.getItem('catID');
const catTitle = localStorage.getItem('catName');
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;



let getJSONData = function(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            return {
                status: 'ok',
                data: response
            };
        })
        .catch(function(error) {
            return {
                status: 'error',
                data: error
            };
        });
};
document.getElementById('sort-options').addEventListener('change', updateProducts);

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(DATA_URL).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            displayProducts(resultado.data);
        }
    });

        document.getElementById("autos").addEventListener("click", function() {
            localStorage.setItem("catID", 101);
            window.location = "products.html"
        });
        document.getElementById("juguetes").addEventListener("click", function() {
            localStorage.setItem("catID", 102);
            window.location = "products.html"
        });
        document.getElementById("muebles").addEventListener("click", function() {
            localStorage.setItem("catID", 103);
            window.location = "products.html"
        });
        document.getElementById("herramientas").addEventListener("click", function() {
            localStorage.setItem("catID", 104);
            window.location = "products.html"
        });
        document.getElementById("computadoras").addEventListener("click", function() {
            localStorage.setItem("catID", 105);
            window.location = "products.html"
        });
        document.getElementById("vestimenta").addEventListener("click", function() {
            localStorage.setItem("catID", 106);
            window.location = "products.html"
        });
        document.getElementById("electrodomesticos").addEventListener("click", function() {
            localStorage.setItem("catID", 107);
            window.location = "products.html"
        });
        document.getElementById("deporte").addEventListener("click", function() {
            localStorage.setItem("catID", 108);
            window.location = "products.html"
        });
        document.getElementById("celulares").addEventListener("click", function() {
            localStorage.setItem("catID", 109);
            window.location = "products.html"
        });
        // Add event listeners for filters and search
    // Añadir eventos para el filtro de precios, búsqueda y ordenamiento
    document.getElementById('sort-options').addEventListener('change', updateProducts);
    document.getElementById('min-price').addEventListener('input', updateProducts);
    document.getElementById('max-price').addEventListener('input', updateProducts);
    document.getElementById('search-bar').addEventListener('input', updateProducts);
});

function displayProducts(data) {
    const catTitleElement = document.getElementById("catTitle");
    if (catTitleElement) {
        catTitleElement.innerHTML = data.catName || catTitle; // Mostrar el título de la categoría
    }

    // Guardar productos en una variable global para usar en los filtros y ordenamientos
    window.products = data.products;

    // Mostrar productos
    renderProducts(window.products);
}

function renderProducts(products) {
    const productContainer = document.querySelector(".autosinner");
    productContainer.innerHTML = '';
    
    if (Array.isArray(products)) {
        products.forEach(product => {
            productContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="price">${product.currency} ${product.cost}</p>
                    </div>
                    <div class="card-footer">
                        <p class="sales">${product.soldCount} Vendidos</p>
                        <div class="text-end">
                            <a href="#" class="btn btn-warning">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function() {
                // const productId = this.getAttribute('data-products-id');
                localStorage.setItem('selectedProductId', 50921);
                window.location.href = 'product-info.html';
            });
        });

    }

function sortProducts(products, sortOrder) {
    let sortedProducts = [...products];

    if (sortOrder === 'price-asc') {
        sortedProducts.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === 'price-desc') {
        sortedProducts.sort((a, b) => b.cost - a.cost);
    } else if (sortOrder === 'most-sold') {
        sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    } else if (sortOrder === 'least-sold') {
        sortedProducts.sort((a, b) => a.soldCount - b.soldCount);
    }

    return sortedProducts;
}

function filterProducts(products, searchQuery, minPrice, maxPrice) {
    return products.filter(product => {
        const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        const matchesMinPrice = minPrice ? product.cost >= minPrice : true;
        const matchesMaxPrice = maxPrice ? product.cost <= maxPrice : true;

        return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
}

function updateProducts() {
    const sortOrder = document.getElementById('sort-options').value;
    const searchQuery = document.getElementById('search-bar').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;

    const sortedProducts = sortProducts(window.products, sortOrder);
    const filteredProducts = filterProducts(sortedProducts, searchQuery, minPrice, maxPrice);
    renderProducts(filteredProducts);
}
 // Verificar si el usuario está autenticado
 const user = localStorage.getItem('user');

 // Verificar si ya se mostró la alerta
 const confirmShown = sessionStorage.getItem('confirmShown');


 if (!user && !confirmShown) {
      // Muestra la alerta
     const userConfirmed = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');
     

     if (userConfirmed) {
         // Redirigir al login si el usuario desea iniciar sesión
         window.location.href = 'login.html';
     } 

     // Marca que la alerta ya se ha mostrado en la sesión actual
     sessionStorage.setItem('confirmShown', 'true');

 };
 if (user) {
  document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
}
  //esto es para cuando le pongamos boton de cerrar sesion
  // document.getElementById('logoutButton').addEventListener('click', function() {
  //     // Eliminar la sesión de LocalStorage
  //     localStorage.removeItem('user');







