
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
          
               
          
                 <div class="col">
                <div class="card h-100">
                    <img src="${element.image}" class="card-img-top" alt="Lamborghini">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="price">${element.currency} ${element.cost}</p>
                        <p class="sales">${element.soldCount}</p>
                    </div>
                    <div class="card-footer text-end">
                        <a href="#" class="btn btn-warning">comprar</a>
                    </div>
                </div>
            </div>
          
               
            `;
        });
    }
}



const DATA_URL =  "//japceibal.github.io/emercado-api/cats_products/101.json"
let getJSONData = function(url){
let result = {};
return fetch(url)
.then(response =>{
    if (response.ok){
        return response.json();
    }else{
        throw Error(response.statusText);
    }
    
})
.then(function(response) {
    result.status = 'ok';
    result.data = response;
    return result; 
})
.catch(function(error) {
    result.status = 'error';
    result.data = error;
    return result;

});

}
document.addEventListener("DomContentLoaded", function(){
    getJSONData(DATA_URL).then(function(resultado){
        if(resultado.status = 'ok'){
            console.log(resultado.data);
            mostrarDATA_URL(resultado.data);
        }
    })
})
function mostrarDATA_URL (array) {
            let mostrar = document.getElementsByClassName("autosinner");
           
            array.forEach(element => {
                
  mostrar.innerHTML +=
        ` <div class="col"
        <div class="card h-100" >
          <img href= ${element.product.image} > 
        <div class="card-body">
         <h1 class="text-center py-4 card-tittle"> ${element.product.name}  </h1>
        <p class "card-text"> ${element.product.name} </P>
          <p class "card-text"> ${element.product.description} </P>
          <p class "card-text"> ${element.product.cost} ${element.product.currency} </P>
          </div>
          <div class="card-footer text-end">
          <p class "card-text"> ${element.product.soldCount} </P>
          </div>
         </div> 
         </div>
          `;
});
}

