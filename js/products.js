// URL del JSON
const catID = localStorage.getItem('catID');
const catTitle = localStorage.getItem('catName');
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

// Función para obtener los datos del JSON
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

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(DATA_URL).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            displayProducts(resultado.data);
        }
    });

    

    // Event listeners for filters and search
    document.getElementById('sort-options').addEventListener('change', updateProducts);
    document.getElementById('min-price').addEventListener('input', updateProducts);
    document.getElementById('max-price').addEventListener('input', updateProducts);
    document.getElementById('search-bar').addEventListener('input', updateProducts);

    // Verificar si el usuario está autenticado
    const user = localStorage.getItem('user');
    const confirmShown = sessionStorage.getItem('confirmShown');

    if (!user && !confirmShown) {
        // Muestra la alerta
        const userConfirmed = confirm('No has iniciado sesión. ¿Deseas iniciar sesión ahora?');

        if (userConfirmed) {
            // Redirigir al login si el usuario desea iniciar sesión
            window.location.href = 'login.html';
        }else{
            window.location.href = 'redireccion_login.html';
        }

        // Marca que la alerta ya se ha mostrado en la sesión actual
        sessionStorage.setItem('confirmShown', 'true');
    }

    if (user) {
        // Cargar datos de perfil si ya existen en localStorage
        const profileData = JSON.parse(localStorage.getItem('profileData'));

        if (profileData) {
            // Mostrar el nombre guardado en la bienvenida
            document.getElementById('user-name').textContent = `Bienvenid@, ${profileData.nombre}`;
        } else {
            // Si no hay perfil guardado, mostrar el email como nombre
        document.getElementById('user-name').textContent = `Bienvenid@, ${user}`;
            }
    }
});

// Función para mostrar los productos
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

// Función para renderizar los productos
function renderProducts(products) {
    const productContainer = document.querySelector(".autosinner");
    productContainer.innerHTML = '';

    if (Array.isArray(products)) {
        products.forEach(product => {
            productContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="card h-100" data-products-id="${product.id}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="price">${product.currency} ${product.cost}</p>
                    </div>
                    <div class="card-footer">
                        <p class="sales">${product.soldCount} Vendidos</p>
                        <div class="text-end">
                            <a href="#" class="btn-buy btn btn-warning" data-products-id="${product.id}">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-products-id'); // Obtener el ID del producto
                localStorage.setItem('selectedProductId', productId); // Guardar en localStorage
                window.location.href = 'product-info.html'; // Redirigir a la página de información del producto
            });
        });
    }
}

// Función para ordenar productos
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

// Función para filtrar productos
function filterProducts(products, searchQuery, minPrice, maxPrice) {
    return products.filter(product => {
        const matchesSearch = searchQuery ? 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) : true; // Agregar el filtrado por descripción
        const matchesMinPrice = minPrice ? product.cost >= minPrice : true;
        const matchesMaxPrice = maxPrice ? product.cost <= maxPrice : true;

        return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
}


// Función para actualizar productos según filtros y orden
function updateProducts() {
    const sortOrder = document.getElementById('sort-options').value;
    const searchQuery = document.getElementById('search-bar').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;

    const sortedProducts = sortProducts(window.products, sortOrder);
    const filteredProducts = filterProducts(sortedProducts, searchQuery, minPrice, maxPrice);
    renderProducts(filteredProducts);
}
// Este script debe ejecutarse una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    
    // Calcular la cantidad total de productos
    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);

    // Actualizar el contenido del badge
    document.getElementById('cart-badge').textContent = totalQuantity;
});