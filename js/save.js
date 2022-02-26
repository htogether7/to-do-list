const saveButton = document.querySelector("#save-button");

function saveToday (event) {
    const saveAnswer = confirm("오늘 한 일을 저장하시겠습니까?");
    const parsedToDosSave = JSON.parse(localStorage.getItem("todos"));
    if (saveAnswer) {
        for (let key in parsedToDosSave) {
            if (parsedToDosSave[key].count !== 0) {
                console.log(parsedToDosSave[key].count);
            }
            // console.log(parsedToDosSave[key].count);
        }
    }
}


saveButton.addEventListener("click", saveToday);