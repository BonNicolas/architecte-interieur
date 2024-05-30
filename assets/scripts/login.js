const urlAPILogin = "http://localhost:5678/api/users/login";
const formLogin = document.querySelector("form");
const buttonLogin = document.querySelector(".btn");
const errorMessage = document.querySelector(".error-login");
const fieldPassword = document.getElementById("password");


async function login() {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        }

        const payload = {
            method: "POST",
            body: new FormData(formLogin)
        };

        try {
            const response = await myFetch(urlAPILogin, payload);
            const data = await response.json();

            if (data.token) {
                window.localStorage.setItem("token", data.token);
                window.location.href = "index.html";
                buttonLogin.classList.add("btn--active-darken");
            } else {
                // Affiche un message d'erreur si les identifiants sont incorrects
                errorMessage.innerHTML = "Erreur dans l’identifiant ou le mot de passe.";
                errorMessage.classList.add("error-login--margin");
                fieldPassword.classList.add("e-mail__input--error-login");
            }
        } catch (error) {
            // Affiche un message d'erreur en cas d'erreur de connexion
            errorMessage.innerHTML = "Erreur de connexion. Veuillez réessayer.";
            errorMessage.classList.add("error-login--margin");
            fieldPassword.classList.add("e-mail__input--error-login");
        }
    });
}


login();
