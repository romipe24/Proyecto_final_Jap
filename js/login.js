document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const createAccountButton = document.querySelector(".btn-secondary");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        
        if (username === "" || password === "") {
            alert("Por favor, completa todos los campos.");
            
        } else { alert("Inicio de sesión exitoso");
         // Guardar la sesión en LocalStorage
        localStorage.setItem('user', username);
        window.location.href = "index.html";
        }

        
       
        
    });

    
    createAccountButton.addEventListener("click", function() {
        window.location.href = "create_account.html"; // pagina ejemplo, hay que hacer una pagina de crear usuario?
    });
});
