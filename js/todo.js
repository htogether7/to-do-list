const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");


let toDos = [];




function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== +li.id);
    li.remove();
    saveToDos();
}

function hideTimeForm() {
    const timeDiv = document.querySelectorAll("#time-div");
    // timeDiv.setAttribute("class", "hidden");
    for (let key in parsedToDos) {
        console.log(parsedToDos[key]);
    }
    // for (let i = 0; i < parsedToDos.length; i++) {
    //     if (parsedToDos[i].time !== "") {
    //         for (let y of timeDiv) {
    //             if (parsedToDos[i].id === +y.parentElement.id) {
    //                 console.log("true");
    //                 y.classList.add("hidden");
    //             }
    //             // console.log(y);
    //         }
    //     }
    // } 

    

    // for (let x of timeDiv) {
    //     if (x.time !== "") {
    //         console.log(x);
    //         // x.setAttribute("class", "hidden");
    //     }
    // }
}



function saveTime(event) {
    // const hideTimeInput = document.querySelector("time-div");
    const toDoObj = localStorage.getItem("todos");
    const toDoJSON = JSON.parse(toDoObj);
    const timeId = event.target.parentElement.parentElement;  

    for (let x of toDoJSON) {
        if (x.id === +timeId.id) {
            x.time = event.target[1].value;
        }
    }
    // console.log(event.target[1].value);
    // toDoJSON[0].time = event.target[1].value; // id가 같은 time에 value 넣어야함
    localStorage.setItem("todos", JSON.stringify(toDoJSON));
    // console.dir(hideTimeInput);
    hideTimeForm();
}

function handleTimeSubmit(event) {
    event.preventDefault();
    // console.log(`목표 완료 시간 : ${event.target[1].value}`);
    saveTime(event);
}

function makeTime(list) {
    const time = document.createElement("div");
    time.setAttribute("id", "time-div");
    const timeForm = document.createElement("form");
    const timeButton = document.createElement("button");
    const timeInput = document.createElement("input");
    const timeSubmit = document.createElement("input");

    timeButton.innerText = "시간";
    timeButton.setAttribute('class', 'timeButton');
    time.appendChild(timeForm);
    timeForm.appendChild(timeButton);
    timeForm.appendChild(timeInput);
    timeForm.appendChild(timeSubmit);
    list.appendChild(time);
    timeInput.setAttribute("type", "time");
    timeSubmit.setAttribute("type", "submit");
    timeInput.setAttribute("required", "");

    timeForm.addEventListener("submit", handleTimeSubmit);
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteToDo);

    // 시간 버튼 누르면, 시간 뜨게 만들기
    // const timeForm = document.createElement("form");
    // const selectTime = timeForm.createElement("input");
    // selectTime.setAttribute('type', 'time');

    

    li.appendChild(span);
    li.appendChild(deleteButton);
    makeTime(li);
    // li.appendChild(time);
    // time.appendChild(timeButton);
    // time.appendChild(timeForm);
    // timeForm.appendChild(selectTime);
    toDoList.appendChild(li);

}

// function handleTimeSubmit(event) {
//     event.preventDefault();
//     console.log()
// }

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        time: "",
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}


toDoForm.addEventListener("submit", handleToDoSubmit);

// selectTime.addEventListener("submit", handleTimeSubmit);


const savedToDos = localStorage.getItem("todos");
const parsedToDos = JSON.parse(savedToDos);

if (savedToDos) {
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
    hideTimeForm();
}


