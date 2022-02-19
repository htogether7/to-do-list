const modeButton = document.querySelector("#mode");
const modeImage = document.querySelector("#mode img")
const background = document.querySelector("body");
const success = document.querySelector("#success");
const fail = document.querySelector("#fail");

function saveMode(){
    if (background.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
}

function toggleSet() {
    background.classList.toggle("dark");
    greeting.classList.toggle("light");
    clock.classList.toggle("light");
    toDoList.classList.toggle("light");
    success.classList.toggle("light");
    fail.classList.toggle("light");
    if (modeImage.classList.contains("mode-image")) {
        modeImage.src = "img/moon.png";
        modeImage.classList.remove("mode-image");
    } else {
        modeImage.src = "img/sun.png";
        modeImage.classList.add("mode-image");
    }
}

function changeMode(event) {
    toggleSet();
    saveMode();
    
}

function handleReload() {
    //
    if (localStorage.getItem("mode") === "dark" && !(background.classList.length) || localStorage.getItem("mode") === "light" && background.classList[0] === "dark") {
        toggleSet();
        saveMode();
    }
}

window.onbeforeunload = handleReload();
modeButton.addEventListener("click", changeMode);