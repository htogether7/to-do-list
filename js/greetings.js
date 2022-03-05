const loginInput = document.querySelector(".login-form input");
const loginForm = document.querySelector(".login-form");
const greeting = document.querySelector(".greeting");

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add("hidden");
    const userName = loginInput.value;
    localStorage.setItem("name", userName);
    paintGreetings(userName);
    localStorage.setItem("todos", "[]");
    localStorage.setItem("today", "[0,0,0]");
    localStorage.setItem("week", "[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]");
}

function paintGreetings(name) {
    const username = localStorage.getItem("name");
    greeting.innerText = `Hello ${name}`;
    loginForm.classList.add("hidden");
    }

//loginForm.addEventListener("submit", onLoginSubmit);

const savedUsername = localStorage.getItem("name");

if (savedUsername === null) {
    loginForm.classList.remove("hidden");
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}