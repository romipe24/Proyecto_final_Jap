const DATA_URL = "//japceibal.github.io/emercado-api/cats_products/101.json";

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
});

function mostrarDATA_URL(array) {
    let mostrar = document.querySelector(".autosinner");
    if (mostrar) {
        array.products.forEach(element => {
            mostrar.innerHTML += `
          
               
          
            <div class="col-md-4 mb-4 ">
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


