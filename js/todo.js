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

function setTime(event ) {
    console.log("시간");
    
}



function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteToDo);
    const time = document.createElement("div");
    const timeButton = document.createElement("button");
    timeButton.innerText = "시간";
    // 시간 버튼 누르면, 시간 뜨게 만들기
    timeButton.addEventListener("click", setTime);
    newTodo.time = "00:00";
    const selectTime = document.createElement("input");
    selectTime.setAttribute('type', 'time');

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(time);
    time.appendChild(timeButton);
    time.appendChild(selectTime);
    toDoList.appendChild(li);
}

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



const savedToDos = localStorage.getItem("todos");

if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}