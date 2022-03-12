const loginInput = document.querySelector(".login-form input");
const loginForm = document.querySelector(".login-form");


function onLoginSubmit(event) {
    const date = new Date();
    event.preventDefault();
    loginForm.classList.add("hidden");
    const userName = loginInput.value;
    localStorage.setItem("name", userName);
    localStorage.setItem("todos", "[]");
    localStorage.setItem("week", "[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]");
    localStorage.setItem("date" , date.getDate());
    // localStorage.setItem("date", date.getMinutes());
    localStorage.setItem("daychange", "0");
    paintGreetings(userName);
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