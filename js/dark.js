const modeButton = document.querySelector("#mode-button");
const body = document.querySelector("body");
const headerContainer = document.querySelector("#header-container");
const articleContainer = document.querySelector("#article-container");
const timeContainer = document.querySelector("#time-container");
const greeting = document.querySelector("#greeting");
const time = document.querySelector("#time");
const modeImage = document.querySelector("#mode-image");

function handleClickModeButton(event) {
    console.log("clicked!");
    body.classList.toggle("dark-mode");
    headerContainer.classList.toggle("dark-mode");
    articleContainer.classList.toggle("dark-mode");
    timeContainer.classList.toggle("dark-mode");
    greeting.classList.toggle("dark-mode");
    time.classList.toggle("dark-mode");
    // modeImage.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        modeImage.setAttribute("src", "../img/moon.png");
    } else {
        modeImage.setAttribute("src", "../img/sun.png");
    }
}

modeButton.addEventListener("click", handleClickModeButton);