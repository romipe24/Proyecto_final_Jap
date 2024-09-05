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

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(DATA_URL).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            mostrarDATA_URL(resultado.data);
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
});

function mostrarDATA_URL(array) {

    // Elemento para mostrar el título de la categoría
    let catTitleElement = document.getElementById("catTitle"); 
    // Mostrar el nombre de la categoría
    if (catTitleElement) {
        catTitleElement.innerHTML = array.catName;
    }



     // Contenedor para los productos
    let mostrar = document.querySelector(".autosinner");

    if (mostrar) {
        array.products.forEach(element => {
            mostrar.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4 mb-4 ">
                <div class="card h-100">
                    <img src="${element.image}" class="card-img-top" alt="Lamborghini">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="price">${element.currency} ${element.cost}</p>
                    </div>
                    
                    <div class="card-footer">
                         <p class="sales">${element.soldCount} Vendidos</p>
                        <div class="text-end">
                            <a href="#" class="btn btn-warning">comprar</a>
                        </div>
                    </div>    
                        
                                
                </div>
            </div>
          
               
            `;
        });
    }
};
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


