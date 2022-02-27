const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");


let toDos = [];

function paintBack() {
    for (let key in parsedToDos) {
        if (parsedToDos[key].count === "success") {
            for (let x of toDoList.children) {
                if (parsedToDos[key].id === +x.id) {
                    x.classList.add("success");
                }
            }
        } else if (parsedToDos[key].count === "mid") {
            for (let x of toDoList.children) {
                if (parsedToDos[key].id === +x.id) {
                    x.classList.add("mid");
                }
            }
        } else if (parsedToDos[key].count === "fail") {
            for (let x of toDoList.children) {
                if (parsedToDos[key].id === +x.id) {
                    x.classList.add("fail");
                }
            }
        }
    }
    console.log(toDoList.children[0]);
}

function showSuccessOrNot(choosedToDo) {
    const toDoListAlarm = document.querySelector("#todo-list");
    for (let x of toDoListAlarm.children) {
        if (+x.id === choosedToDo.id) {
            x.children[4].classList.remove("hidden");
        }
    }
}
function checkTime() {
    const parsedToDosAlarm = JSON.parse(localStorage.getItem("todos"));
    for (let key in parsedToDosAlarm) {
        const clockNow = clock.innerHTML.split(':');
        const clockGoal = parsedToDosAlarm[key].time.split(":");
        const diffMin = (+clockGoal[0]) * 60 + (+clockGoal[1]) - ((+clockNow[0]) * 60 + (+clockNow[1]));
        if (diffMin <= 0 && parsedToDosAlarm[key].count === 0) {
            showSuccessOrNot(parsedToDosAlarm[key]);
        }
    }
}
// function showAlarm() {
//     const parsedToDosAlarm = JSON.parse(localStorage.getItem("todos"));
//     for (let key in parsedToDosAlarm) {
//         const clockNow = clock.innerHTML.split(':');
//         const clockGoal = parsedToDosAlarm[key].time.split(":");
//         const diffMin = (+clockGoal[0]) * 60 + (+clockGoal[1]) - ((+clockNow[0]) * 60 + (+clockNow[1]));
//         if (diffMin > 0 && diffMin <= 10 && parsedToDosAlarm[key].pageCount === 0) {
//             // console.log(x);
//             console.log(`${parsedToDosAlarm[key].id}, 10분 남았습니다.`);
//             window.open("alarm.html");
//             for (let x of toDos) {
//                 if (x.id === parsedToDosAlarm[key].id) {
//                     x.pageCount = 1;
//                 }
//             }
//             saveToDos();
//         }
        

//         if (diffMin <= 0 && parsedToDosAlarm[key].pageCount === 1) {
//             window.open("finishalarm.html");
//             for (let x of toDos) {
//                 if (x.id === parsedToDosAlarm[key].id) {
//                     x.pageCount = 2;
//                 }
//             }
//             saveToDos();
//             showSuccessOrNot(parsedToDosAlarm[key]);  
//         }
//     }
// }


function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== +li.id);
    li.remove();
    saveToDos();
}

function changeTimeButton(div, parsedToDosTime) {
    // const timeButton = document.querySelector("`#${id}`");
    // // // timeButton.innerText = "시간 바꾸기";
    
    const changedTimeForm = div.parentElement;
    const changedTimeFormID = changedTimeForm.id;
    // console.log(changedTimeForm.id);
    let changeTimeText = 0;
    for (let x of parsedToDosTime) {
        if (x.id === +changedTimeFormID) {
            changeTimeText = x.time;
        }
    }
    changedTimeForm.children[2].innerHTML = `목표 시간 : ${changeTimeText} 까지`;

}

function hideTimeForm() {
    const timeDiv = document.querySelectorAll("#time-div");
    // timeDiv.setAttribute("class", "hidden");
    const parsedToDosTime = JSON.parse(localStorage.getItem("todos"));
    // console.log(parsedToDosTime);
    for (let key in parsedToDosTime) {
        if (parsedToDosTime[key].time !== "") {
            for (let x of timeDiv) {
                // console.log(x);
                if (+x.parentElement.id === parsedToDosTime[key].id) {
                    x.classList.add("hidden");
                    changeTimeButton(x, parsedToDosTime);
                }
            }
        }
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
    
    const parsedToDosTime = JSON.parse(localStorage.getItem("todos"));
    console.log(parsedToDosTime);
    const timeId = event.target.parentElement.parentElement;  
    console.log(timeId);
    for (let key in parsedToDosTime) {
        if (parsedToDosTime[key].id === +timeId.id) {
            parsedToDosTime[key].time = event.target[0].value;
            console.log(parsedToDosTime[key]);
        }
    }
    toDos = parsedToDosTime;
    localStorage.setItem("todos", JSON.stringify(parsedToDosTime));
    hideTimeForm();
}

function handleTimeSubmit(event) {
    event.preventDefault();
    // console.log(`목표 완료 시간 : ${event.target[1].value}`);
    saveTime(event);
}


function handleSuccess(event) {
    const li = event.target.parentElement.parentElement;
    const buttonSet = event.target.parentElement;
    const parsedToDosSuccess = JSON.parse(localStorage.getItem("todos"));
    let answer = confirm("목표 시간안에 달성하였습니까?");
    if (answer) {
        li.classList.add("success");
        buttonSet.classList.add("hidden");
        for (let key in parsedToDosSuccess) {
            if (parsedToDosSuccess[key].id === +li.id) {
                parsedToDosSuccess[key].count = "success";
                break;
            }
        }
        localStorage.setItem("todos", JSON.stringify(parsedToDosSuccess));
        // if (parsedToDos)
    }
    
    
}

function handleMid(event) {
    const li = event.target.parentElement.parentElement;
    const buttonSet = event.target.parentElement;
    const parsedToDosMid = JSON.parse(localStorage.getItem("todos"));
    let answer = confirm("목표 시간 이후에 달성하였습니까?");
    if (answer) {
        li.classList.add("mid");
        buttonSet.classList.add("hidden");
        for (let key in parsedToDosMid) {
            if (parsedToDosMid[key].id === +li.id) {
                parsedToDosMid[key].count = "mid";
                break;
            }
        }
        localStorage.setItem("todos", JSON.stringify(parsedToDosMid));
    }
    
}

function handleFail(event) {
    const li = event.target.parentElement.parentElement;
    const buttonSet = event.target.parentElement;
    const parsedToDosFail = JSON.parse(localStorage.getItem("todos"));
    let answer = confirm("하지 않았습니까?");
    if (answer) {
        li.classList.add("fail");
        buttonSet.classList.add("hidden");
        for (let key in parsedToDosFail) {
            if (parsedToDosFail[key].id === +li.id) {
                parsedToDosFail[key].count = "fail";
                break;
            }
        }
        localStorage.setItem("todos", JSON.stringify(parsedToDosFail));
    }
    
}

function makeTime(list) {
    const time = document.createElement("div");
    time.setAttribute("id", "time-div");
    time.setAttribute("class", "hidden");
    const timeForm = document.createElement("form");
    const timeInput = document.createElement("input");
    const timeSubmit = document.createElement("input");

    const successDiv = document.createElement("div");
    const successButton = document.createElement("button");
    successButton.setAttribute("class", "success-button");
    const failButton = document.createElement("button");
    failButton.setAttribute("class", "fail-button");
    const midButton = document.createElement("button");
    midButton.setAttribute("class", "mid-button");
    successDiv.appendChild(successButton);
    successDiv.appendChild(midButton);
    successDiv.appendChild(failButton);
    successButton.innerHTML = "✓";
    midButton.innerHTML = "▵";
    failButton.innerHTML = "✕";


    time.appendChild(timeForm);
    timeForm.appendChild(timeInput);
    timeForm.appendChild(timeSubmit);
    list.appendChild(time);
    list.appendChild(successDiv);
    successDiv.setAttribute("class", "hidden");
    successDiv.classList.add("success-div");
    timeInput.setAttribute("type", "time");
    timeSubmit.setAttribute("type", "submit");
    timeInput.setAttribute("required", "");

    timeForm.addEventListener("submit", handleTimeSubmit);

    successButton.addEventListener("click", handleSuccess);
    midButton.addEventListener("click", handleMid);
    failButton.addEventListener("click", handleFail);
}

function showTimeForm(event) {
    const allLi = document.querySelectorAll("#todo-list li");
    for (let x of allLi) {
        if (x.id === event.path[1].id) {
            console.log(x.children[3].classList.remove('hidden'));
        }
    }
    // if () {

    // }
}


function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteToDo);
    const timeButtonSpan = document.createElement("span");
    const timeButton = document.createElement("button");
    timeButton.classList.add("time-button");
    timeButton.innerText = "시간";


    // 시간 버튼 누르면, 시간 뜨게 만들기
    // const timeForm = document.createElement("form");
    // const selectTime = timeForm.createElement("input");
    // selectTime.setAttribute('type', 'time');

    

    li.appendChild(span);
    li.appendChild(deleteButton);
    // timeButtonSpan.appendChild(timeButton);
    li.appendChild(timeButton);
    makeTime(li);
    // li.appendChild(time);
    // time.appendChild(timeButton);
    // time.appendChild(timeForm);
    // timeForm.appendChild(selectTime);
    toDoList.appendChild(li);
    const showTime = li.querySelector(".time-button");
    // console.dir(showTime[0].parentElement.id);
    showTime.addEventListener("click", showTimeForm);
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
        count: 0,
        date: "",
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();

}


toDoForm.addEventListener("submit", handleToDoSubmit);

// selectTime.addEventListener("submit", handleTimeSubmit);


const savedToDos = localStorage.getItem("todos");
const parsedToDos = JSON.parse(savedToDos);
const today = new Date();

if (savedToDos!== "null") {
    parsedToDos.forEach(paintToDo);
    hideTimeForm();
    paintBack();
    // showAlarm();

}
setInterval(checkTime,1000);
// setInterval(check)