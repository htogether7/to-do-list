const helpButton = document.querySelector("#help-button");

function handleHelpButtonClick(event) {
    let option = "left=400,top=100,width=500,height=500";
    window.open("../help.html", "Help", option);
}

helpButton.addEventListener("click", handleHelpButtonClick);