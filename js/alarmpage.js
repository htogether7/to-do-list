const toDoListLink = document.querySelector("a");

function toDoListLinkClick () {
    window.close();
}

toDoListLink.addEventListener("click", toDoListLinkClick);