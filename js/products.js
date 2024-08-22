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
          <img href= ${element.image} > 
        <div class="card-body">
         <h1 class="text-center py-4 card-tittle"> ${element.name}  </h1>
        <p class "card-text"> ${element.name} </P>
          <p class "card-text"> ${element.description} </P>
          <p class "card-text"> ${element.cost} ${element.currency} </P>
          </div>
          <div class="card-footer text-end">
          <p class "card-text"> ${element.soldCount} </P>
          </div>
         </div> 
         </div>
          `;
});
}