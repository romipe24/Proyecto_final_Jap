//const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
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

