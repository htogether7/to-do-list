const modeButton = document.querySelector("#mode");
const modeImage = document.querySelector("#mode img")
const makeDark = document.querySelector("body");

function changeMode(event) {
    // 다크모드에서 밝아야할 것과 어두워야할 것들 구분지어 토글
    makeDark.classList.toggle("dark");
    greeting.classList.toggle("light");
    clock.classList.toggle("light");
    toDoList.classList.toggle("light");

    if (modeImage.classList.contains("mode-image")) {
        modeImage.src = "img/moon.png";
        modeImage.classList.remove("mode-image");
    } else {
        modeImage.src = "img/sun.png";
        modeImage.classList.add("mode-image");
    }
    console.log(modeImage.src);

}

modeButton.addEventListener("click", changeMode);