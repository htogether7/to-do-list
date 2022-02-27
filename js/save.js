const saveButton = document.querySelector("#save-button");
const dayBox = document.querySelector(".day-box");
// const showWeek = Array.from({length:7}, ()=>"Not Today");

console.log(dayBox);
function saveToday (event) {
    // const showToday = {
    //     success : [],
    //     mid : [],
    //     fail : [],
    // }
    const saveAnswer = confirm("오늘 한 일을 저장하시겠습니까?");
    const parsedToDosSave = JSON.parse(localStorage.getItem("todos"));
    console.log(parsedToDosSave);
    if (saveAnswer) {
        for (let key in parsedToDosSave) {
            if (parsedToDosSave[key].count === "success" || parsedToDosSave[key].count === "fail" || parsedToDosSave[key].count === "mid") {
    //             //저장
    //             // console.log(parsedToDosSave[key].count);
    //             // localStorage.setItem({})
    //             showToday[parsedToDosSave[key].count].push(parsedToDosSave[key].text);
    //             parsedToDosSave[key].count = "saved";
    //             localStorage.setItem("todos", JSON.stringify(parsedToDosSave));
    //             localStorage.setItem("todoy", JSON.stringify(showToday));
                for (let i = 0; i < toDoList.children.length; i++) {
                    if (+toDoList.children[i].id === parsedToDosSave[key].id) {
                        // toDoList.children[i].classList.add("hidden");
                        parsedToDosSave.splice(key, 1);
                        localStorage.setItem("todos", JSON.stringify(parsedToDosSave));
                        console.log(toDoList.children[i]);
                        toDoList.children[i].remove();
                        dayBox.children[6].classList.add("save");
                    }
                }
                
            }
            // console.log(parsedToDosSave[key].count);
        }
    //     console.log(showToday);
    }
}

saveButton.addEventListener("click", saveToday);