// Cargar los productos del localStorage
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const cartContent = document.getElementById('cart-content');
const totalElementUSD = document.getElementById('totalUSD');
const totalElementUYU = document.getElementById('totalUYU');
const cartBadge = document.getElementById('cart-badge');

// Función para convertir precios del formato con punto decimal a número entero
const convertPrice = (price) => {
    return typeof price === 'string' ? parseFloat(price.replace(/\./g, '')) : price;
};

// Función para formatear números con comas
const formatNumber = (num) => num.toLocaleString();

// Función para actualizar el badge del carrito
const updateCartBadge = () => {
    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);
    cartBadge.textContent = totalQuantity;
};

// Actualizar el badge cuando se cargue la página
updateCartBadge();

if (cartProducts.length > 0) {
    let total = 0;

    cartProducts.forEach((product, index) => {
        product.price = convertPrice(product.price);

        const updateTotal = () => {
            let subtotalUSD = 0;
            let subtotalUYU = 0;
            cartProducts.forEach(product => {
                if (product.currency === 'USD') {
                    subtotalUSD += product.price * product.quantity;
                } else if (product.currency === 'UYU') {
                    subtotalUYU += product.price * product.quantity;
                }
            });

            totalElementUSD.style.display = subtotalUSD > 0 ? 'block' : 'none';
            totalElementUSD.textContent = `Total USD ${formatNumber(subtotalUSD.toFixed(2))}`;
            totalElementUYU.style.display = subtotalUYU > 0 ? 'block' : 'none';
            totalElementUYU.textContent = `Total UYU ${formatNumber(subtotalUYU.toFixed(2))}`;
        };

        const productDiv = document.createElement('div');
        productDiv.className = "cart-item";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>Precio: ${product.currency} ${product.price}</p>
                <p>Subtotal: <span id="subtotal-${index}">${product.currency} ${(product.price * product.quantity).toFixed(2)}</span></p>
            </div>
            <div class="cart-actions">
                <div class="input-group">
                    <button class="btn btn-outline-secondary" type="button" id="decrease-${index}">-</button>
                    <input type="text" class="form-control text-center" id="quantity-${index}" value="${product.quantity}" readonly>
                    <button class="btn btn-outline-secondary" type="button" id="increase-${index}">+</button>
                </div>
                <button class="btn btn-danger" id="remove-${index}"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        cartContent.appendChild(productDiv);
        updateTotal();

        const increaseButton = document.getElementById(`increase-${index}`);
        const decreaseButton = document.getElementById(`decrease-${index}`);
        const quantityInput = document.getElementById(`quantity-${index}`);

        increaseButton.addEventListener('click', () => {
            product.quantity++;
            quantityInput.value = product.quantity;
            document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${formatNumber((product.price * product.quantity).toFixed(2))}`;
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            updateTotal();
            updateCartBadge(); // Actualizar el badge
        });

        decreaseButton.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
                quantityInput.value = product.quantity;
                document.getElementById(`subtotal-${index}`).textContent = `${product.currency} ${formatNumber((product.price * product.quantity).toFixed(2))}`;
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
                updateTotal();
                updateCartBadge(); // Actualizar el badge
            }
        });

        document.getElementById(`remove-${index}`).addEventListener('click', () => {
            cartProducts.splice(index, 1);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            window.location.reload(); // Recargar la página para refrescar el carrito
            updateCartBadge(); // Actualizar el badge
        });
    });
} else {
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElementUSD.textContent = '';
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cartProducts');
    cartProducts = [];
    cartContent.innerHTML = `<p class="alert alert-warning">El carrito está vacío.</p>`;
    totalElementUSD.textContent = '';
    totalElementUYU.textContent = '';
    updateCartBadge(); // Actualizar el badge
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
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
      updateProductQuantity(1);
    }, 100);
  
    setTimeout(() => {
      updateProductQuantity(-1);
    }, 100);
  
    cardCheck.addEventListener('click', alternatePayment);
    bankCheck.addEventListener('click', alternatePayment);
    
  // Llamada a funciones
  fetchCartData();
  userEmailFunction();
  });
  window.addEventListener('load', fetchDataAndShow);
  
  // Cambiar precio de envio en tiempo real
const selectShip = document.getElementById('selectShip');
let selectedOption = selectShip.value;

selectShip.addEventListener('change', () => {
  selectedOption = selectShip.value;
  updateDeliveryFee();
});

function updateDeliveryFee() {
  const subtotalSumValue = parseFloat(subtotalSum.textContent);

  let deliveryFeePercentage = 0;
  const selectShip = document.getElementById('selectShip');
  let selectedOption = selectShip.value;
  // Calcular precio de envio y total
  switch (selectedOption) {
    case "disabled":
      deliveryFeePercentage = 0;
      break;
    case "premium":
      deliveryFeePercentage = 0.15;
      break;
    case "express":
      deliveryFeePercentage = 0.07;
      break;
    case "standard":
      deliveryFeePercentage = 0.05;
      break;
    default:
      deliveryFeePercentage = 0;
  }

  const deliveryFeeValue = subtotalSumValue * deliveryFeePercentage;

  deliveryFee.textContent = deliveryFeeValue.toFixed(2);

  const totalPriceValue = subtotalSumValue + deliveryFeeValue;
  totalPrice.textContent = totalPriceValue.toFixed(2);
}



// Fetch carrito de compras
async function fetchCartData() {
  try {
    const response = await fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json');
    const data = await response.json();
    arrayCartStandar.push(...data.articles);
    console.log(arrayCartStandar);

    const selectedItem = arrayCartStandar[0];
    updateCartUI(selectedItem);
    updateTotalSum();
  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
}
/* 
Validaciónes de MODAL para los métodos de PAGO
*/
     // VARIABLES GLOBALES
     const monthInput = document.getElementById('month');
     const cardNumber = document.getElementById('cardNumber');
     const cardSelected = document.getElementById('cardSelected');
     const cvv = document.getElementById('cvv');
     const cardIcon = document.getElementById('cardIcon');
     const cardCheck = document.getElementById('cardCheck');
     const bankCheck = document.getElementById('bankCheck');
     const accountNumber = document.getElementById('accountNumber');
     const btnSelectPay = document.getElementById('btnSelectPay');
     const cancelPay = document.getElementById('cancelPay');
     
     // CAMBIAR IMÁGEN DE TARJETA DE CREDITO AL SELECCIONARLA
     cardSelected.addEventListener('change', function() {
       const selectedOption = cardSelected.value;
       if (selectedOption === 'Visa') {
         cardIcon.innerHTML = '<img class="img-thumbnail img-fluid" src="img/visa.webp" alt="Visa">';
       } else if (selectedOption === 'Master') {
         cardIcon.innerHTML = '<img class="img-thumbnail img-fluid" src="img/Mastercard-Symbol.jpg" alt="MasterCard">';
       } else {
         cardIcon.innerHTML = '';
       }
     });
     cardIcon.innerHTML = '';
     
     // ************  DECLARACION DE FUNCIONES: DE DISABLED, ENABLED, CLEAR **************************
     function disableFields(inputs) {
       inputs.forEach(input => {
         input.setAttribute('disabled', 'disabled');
       });
     }
     
     function enableFields(inputs) {
       inputs.forEach(input => {
         input.removeAttribute('disabled');
       });
     }
     
     function clearFields(inputs) {
       inputs.forEach(input => {
         input.value = '';
       });
     }
     /* ********************************************************************************************** */
     //Variable para guardar el método de pago seleccionado
     let methodPaymentSelected = undefined; 
     
     // BlOQUEAR OPCIONES (TARJETA O TRANSFERENCIA) al ingresar al botón "Seleccionar"
     btnSelectPay.addEventListener('click', function () {
       if (cardCheck.checked) {
         disableFields([accountNumber]);
         clearFields([accountNumber]);
         enableFields([cardNumber, cvv, monthInput, cardSelected]);
         methodPaymentSelected = 'card';
       } else if (bankCheck.checked) {
         enableFields([accountNumber]);
         disableFields([cardNumber, cvv, monthInput, cardSelected]);
         clearFields([cardNumber, monthInput, cvv]);
         methodPaymentSelected = 'bank';
         cardSelected.value = 'disabled';
       } else {
         disableFields([accountNumber,cardNumber,cvv,monthInput,cardSelected]);
         clearFields([accountNumber, cardNumber, cvv, monthInput]);
         methodPaymentSelected = undefined;
         cardSelected.value = 'disabled';
       }
     });
     
     // Deshabilitar campos de la opción no seleccionada ALTERNANDO
     function alternatePayment() {
       if (cardCheck.checked) {
         disableFields([accountNumber]);
         clearFields([accountNumber]);
         enableFields([cardNumber, cvv, monthInput, cardSelected]);
         methodPaymentSelected = 'card';
       } else if (bankCheck.checked) {
         enableFields([accountNumber]);
         disableFields([cardNumber, cvv, monthInput, cardSelected]);
         methodPaymentSelected = 'bank';
         clearFields([cardNumber, cvv, monthInput, cardSelected]);
       }
     }
     // FUNCION PARA ELIMINAR DATOS AL BOTON CANCELAR del modal
     cancelPay.addEventListener('click' , function(){
       clearFields([accountNumber, cardNumber, monthInput, cvv]);
       bankCheck.checked = false;
       cardCheck.checked = false;
     })
     //******************************************************************************************* */
     
     //Función para remover las alertas
     const divAlert = document.getElementById('divAlert');
     function removeAlert() {
         setTimeout(() => {
             divAlert.innerHTML = '';
         }, 4000);
     };
     
     //Función que válida que los campos del modal no esten vacíos en consecuencia del método de pago selecionado.
     function validateMethodPayment(methodSelected){
       if (methodSelected === 'card'){
        if(monthInput.value !== '' && validateCardExpiration(monthInput.value) && cardNumber.value !== '' && cvv.value !== '' && cardSelected.value !== 'disabled') {
         return true;
        } else {
         return false;
        }
       } else if(methodSelected === 'bank'){
         if(accountNumber.value !== ''){
           return true;
         } else {
           return false;
         }
       }
     };
     
     //Función para validar la fecha de vencimiento de la tarjeta ingresada comparandola con la fecha local
     function validateCardExpiration(cardExpiration){
       const newDate = new Date();
       const currentDate = newDate.toLocaleString('sv-SE', {year:'numeric', month:'2-digit'});
       const currentDateString = currentDate.toString();
       if(cardExpiration > currentDateString){
         return true;
       } else {
         return false
       };
     };
     
     //Función para realizar las validaciones previas a la compra y aplicar estilos con bootstrap 
     (()=> {
       'use strict'
     
       const form = document.querySelector('.needs-validation');
     
       form.addEventListener('submit', event => {
         
     
         if (!form.checkValidity()) {
           event.preventDefault();
           event.stopPropagation();
         }
     
     const streetAddress = document.getElementById('streetA');
     const numberAddress = document.getElementById('numberA');
     const cornerAddress = document.getElementById('cornerA');
     const selectMethodPayment = document.getElementById('selectMethodPayment');
     
     if(streetAddress.value === ""){
       event.preventDefault();
       streetAddress.classList.remove('is-valid');
       streetAddress.classList.add('is-invalid');
     } else {
       streetAddress.classList.remove('is-invalid');
       streetAddress.classList.add('is-valid');
     }
     
     if(numberAddress.value === ""){
       event.preventDefault();
       numberAddress.classList.remove('is-valid');
       numberAddress.classList.add('is-invalid');
     } else {
       numberAddress.classList.remove('is-invalid');
       numberAddress.classList.add('is-valid');
     }
     
     if(cornerAddress.value === ""){
       event.preventDefault();
       cornerAddress.classList.remove('is-valid');
       cornerAddress.classList.add('is-invalid');
     } else {
       cornerAddress.classList.remove('is-invalid');
       cornerAddress.classList.add('is-valid');
     }
     
     if(selectedOption === "disabled") {
       event.preventDefault();
       selectShip.classList.remove('is-valid');
       selectShip.classList.add('is-invalid');
     } else {
       selectShip.classList.remove('is-invalid');
       selectShip.classList.add('is-valid');
     }
     
     if(validateMethodPayment(methodPaymentSelected)) {
       event.preventDefault();
       btnSelectPay.classList.remove('is-invalid', 'custom');
       btnSelectPay.classList.add('is-valid');
       selectMethodPayment.classList.add('is-valid');
       selectMethodPayment.classList.remove('is-invalid');
     } else {
      btnSelectPay.classList.remove('is-valid');
       btnSelectPay.classList.add('is-invalid', 'custom');
       selectMethodPayment.classList.add('is-invalid');
       selectMethodPayment.classList.remove('is-valid');
     }
     
     if(methodPaymentSelected === 'card'){
       
       if(monthInput.value === '' || !validateCardExpiration(monthInput.value)) {
         monthInput.classList.add('is-invalid');
         monthInput.classList.remove('is-valid');
       } else {
         monthInput.classList.add('is-valid');
         monthInput.classList.remove('is-invalid');
       }
     
       if(cvv.value === '') {
       cvv.classList.add('is-invalid');
       cvv.classList.remove('is-valid');
       } else {
       cvv.classList.add('is-valid');
       cvv.classList.remove('is-invalid');
       }
     
       if(cardNumber.value === '') {
       cardNumber.classList.add('is-invalid');
       cardNumber.classList.remove('is-valid');
       } else {
       cardNumber.classList.add('is-valid');
       cardNumber.classList.remove('is-invalid');
       }
     
       if(cardSelected.value == 'disabled') {
       cardSelected.classList.add('is-invalid');
       cardSelected.classList.remove('is-valid');
       } else {
       cardSelected.classList.add('is-valid');
       cardSelected.classList.remove('is-invalid');
       }
     
     } else if(methodPaymentSelected === 'bank'){
     if(accountNumber.value === ''){
       accountNumber.classList.add('is-invalid');
       accountNumber.classList.remove('is-valid');
       } else {
       accountNumber.classList.add('is-valid');
       accountNumber.classList.remove('is-invalid');
     }
     }
     
     if(streetAddress.value !== '' && numberAddress.value !== '' && cornerAddress.value !== '' && selectedOption !== "disabled"  && selectedQuantity <= 1 && validateMethodPayment(methodPaymentSelected)) {
       form.classList.add('was-validated');
       divAlert.innerHTML += `
       <div id="successAlert" class="alert alert-success" role="alert" style="z-index: 1;">
       ¡Has comprado con éxito!
       </div>
       `;
       event.preventDefault()
     } else {
       divAlert.innerHTML +=`
        <div id="failAlert" class="alert alert-danger" role="alert" style="z-index: 1;">
        Verifica que los datos ingresados sean correctos
     </div>
        `;  
        event.preventDefault()
        form.classList.remove('was-validated');
     }
     removeAlert()
       }, false)
     
       
     
     })()