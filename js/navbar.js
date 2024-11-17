// Obtenemos todas las tarjetas que tienen la clase 'custom-card'
const cards = document.querySelectorAll('.custom-card');

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

