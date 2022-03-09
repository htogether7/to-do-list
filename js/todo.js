const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector(".todo-form input");
const toDoList = document.querySelector(".todo-list");



function deleteTodo(event) {
    let toDosDelete = JSON.parse(localStorage.getItem("todos"));
    let newToDosDelete = toDosDelete.filter(x => (x.id !== +event.target.parentElement.id));
    localStorage.setItem("todos", JSON.stringify(newToDosDelete));
    event.target.parentElement.remove();
}

function handleSuccess(event) {
    let success = event.target.parentElement.parentElement;
    let toDosHandleSuccess = JSON.parse(localStorage.getItem("todos"));
    let achievement = 0;
    toDosHandleSuccess.map((todo) => {
        if (todo.id === +success.parentElement.id) {
            if (!todo.time) {
                todo.count = "success";
            } else {
                //time이 있을 때 
                const knowTime = new Date();
                const knowHour = knowTime.getHours();
                const knowMinute = knowTime.getMinutes(); 
                const [limitHour, limitMinute] = todo.time.split(":");
                if (knowHour < limitHour) {
                    todo.count = "success";
                } else if (knowHour > limitHour) {
                    todo.count = "mid";
                    achievement = 1;
                } else {
                    if (knowMinute <= limitMinute) {
                        todo.count = "success";
                    } else {
                        todo.count = "mid";
                        achievement = 1;
                    }
                }
            }
            
        }

    });
    localStorage.setItem("todos", JSON.stringify(toDosHandleSuccess));
    const successAnswer = confirm("완료했습니까?");
    if (successAnswer) {
        let week = JSON.parse(localStorage.getItem("week"));
        success.children[1].classList.add("hidden");
        success.parentElement.children[1].classList.add("hidden");
        if (!achievement) {
            success.classList.add("success");
            week[week.length-1][0]++;
            localStorage.setItem("week", JSON.stringify(week));
        } else {
            success.classList.add("mid");
            week[week.length-1][1]++;
            localStorage.setItem("week", JSON.stringify(week));
        }
        
        colorToday();
    }

}

function handleFail(event) {
    let fail = event.target.parentElement.parentElement;
    let toDosHandleFail = JSON.parse(localStorage.getItem("todos"));
    toDosHandleFail.map((todo) => {
        if (todo.id === +fail.parentElement.id) {
            todo.count = "fail";
        }
    });
    localStorage.setItem("todos", JSON.stringify(toDosHandleFail));
    const failAnswer = confirm("오늘 하지 못했습니까?");
    if (failAnswer) {
        fail.classList.add("fail");
        fail.children[1].classList.add("hidden");
        fail.parentElement.children[1].classList.add("hidden");
        let week = JSON.parse(localStorage.getItem("week"));
        week[week.length-1][2]++;
        localStorage.setItem("week", JSON.stringify(week));
        colorToday();
    }
    
}

function handleSubmitTime(event) {
    event.preventDefault();
    const timeValue = event.target.children[0].value;
    event.target.parentElement.children[0].classList.remove("hidden");
    event.target.parentElement.children[0].innerText = timeValue;
    event.target.classList.add("hidden");

    const timeId = event.target.parentElement.parentElement.parentElement.parentElement.id;
    let parsedToDosSubmitTime = JSON.parse(localStorage.getItem("todos"));
    for (let x of parsedToDosSubmitTime) {
        if (x.id === +timeId) {
            x.time = timeValue;
            break;
        }
    }
    localStorage.setItem("todos", JSON.stringify(parsedToDosSubmitTime));
}


function handleTime(event) {
    // event.preventDefault();
    // // event.target.parentElement.parentElement.children[0].innerText = `${event.target.children[0].value}까지`;
    // console.log(event.target.parentElement.parentElement.children[0]);
    // event.target.parentElement.parentElement.children[0].classList.remove("hidden");
    // event.target.parentElement.parentElement.children[0].innerText = `${event.target.parentElement.children}까지`;
    // event.target.parentElement.classList.add("hidden");
    const timeButton = event.target.parentElement.children[0];
    const timeForm = event.target.parentElement.children[1];
    timeButton.classList.add("hidden");
    timeForm.classList.remove("hidden");
    timeForm.addEventListener("submit", handleSubmitTime);
    // console.log(event.target.parentElement.children);
    // timeButton.innerText = event.target
}


function paintToDo(obj) {
    const li = document.createElement("li");
    const liContainer = document.createElement("div");
    const toDoText = document.createElement("div");
    const liButtonContainer = document.createElement("div");
    const successButton = document.createElement("button");
    const failButton = document.createElement("button");
    const timeDiv = document.createElement("div");
    const timeButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const timeImage = document.createElement("img");
    const timeForm = document.createElement("form");
    const timeInput = document.createElement("input");
    const timeSubmitButton = document.createElement("input");

    li.id = obj.id;
    liContainer.classList.add("li-container");
    toDoText.classList.add("todo-text");
    liButtonContainer.classList.add("li-button-container");
    successButton.classList.add("success-button");
    failButton.classList.add("fail-button");
    timeDiv.classList.add("time-div");
    timeButton.classList.add("time-button");
    deleteButton.classList.add("delete-button");
    timeImage.classList.add("time-image");
    timeInput.setAttribute("type", "time");
    timeInput.setAttribute("required", "");
    timeSubmitButton.setAttribute("type", "submit");
    timeForm.classList.add("hidden");
    

    timeImage.src = "img/time.png";


    toDoText.innerHTML = obj.text;
    successButton.innerHTML = "✓";
    failButton.innerHTML = "✕";
    deleteButton.innerHTML = "✕";
    timeButton.innerText = "T";

    li.appendChild(liContainer);
    li.appendChild(deleteButton);
    liContainer.appendChild(toDoText);
    liContainer.appendChild(liButtonContainer);
    liButtonContainer.appendChild(successButton);
    liButtonContainer.appendChild(failButton);
    timeDiv.appendChild(timeButton);
    liButtonContainer.appendChild(timeDiv);
    // timeButton.appendChild(timeImage);

    toDoList.appendChild(li);
    successButton.addEventListener("click", handleSuccess);
    failButton.addEventListener("click", handleFail);
    deleteButton.addEventListener("click", deleteTodo);
    timeButton.addEventListener("click", handleTime);
    timeForm.appendChild(timeInput);
    timeForm.appendChild(timeSubmitButton);
    timeDiv.appendChild(timeForm);

    let parsedToDosPaint = JSON.parse(localStorage.getItem("todos"));
    for (let x of parsedToDosPaint) {
        if (x.id === +li.id && x.count !== 0) {
            //배경 칠하고, li-button-container 숨기기
            if (x.count === "success") {
                li.children[1].classList.add("hidden");
                li.children[0].classList.add("success");
                li.children[0].children[1].classList.add("hidden");
            } else if (x.count === "fail") {
                li.children[1].classList.add("hidden");
                li.children[0].classList.add("fail");
                li.children[0].children[1].classList.add("hidden");
            } else if (x.count === "mid") {
                li.children[1].classList.add("hidden");
                li.children[0].classList.add("mid");
                li.children[0].children[1].classList.add("hidden");
            }
        }

        if (x.id === +li.id && x.time) {
            li.children[0].children[1].children[2].children[0].innerText = x.time;
        }
    }
    
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        time: "",
        count: 0,
    };

    // localStorage todos에 저장
    let toDos = JSON.parse(localStorage.getItem("todos"));
    toDos.push(newTodoObj);
    localStorage.setItem("todos", JSON.stringify(toDos));

    // html li 추가
    paintToDo(newTodoObj);
}


toDoForm.addEventListener("submit", handleToDoSubmit);

//새로고침해도 화면에 유지될 수 있게함.
if (JSON.parse(localStorage.getItem("todos"))) {  
    colorToday();
    for (let x of JSON.parse(localStorage.getItem("todos"))) {
        paintToDo(x);
        for (let y of toDoList.children) {
            if (x.id === +y.id) {
                if (x.count === "fail") {
                    y.children[0].classList.add("fail")
                } else if (x.count === "success") {
                    y.children[0].classList.add("success");
                }
                break;
            }
        }
    }
}



// let toDos = [];

// function paintBack() {
//     for (let key in parsedToDos) {
//         if (parsedToDos[key].count === "success") {
//             for (let x of toDoList.children) {
//                 if (parsedToDos[key].id === +x.id) {
//                     x.classList.add("success");
//                 }
//             }
//         } else if (parsedToDos[key].count === "mid") {
//             for (let x of toDoList.children) {
//                 if (parsedToDos[key].id === +x.id) {
//                     x.classList.add("mid");
//                 }
//             }
//         } else if (parsedToDos[key].count === "fail") {
//             for (let x of toDoList.children) {
//                 if (parsedToDos[key].id === +x.id) {
//                     x.classList.add("fail");
//                 }
//             }
//         }
//     }
//     console.log(toDoList.children[0]);
// }

// function showSuccessOrNot(choosedToDo) {
//     const toDoListAlarm = document.querySelector("#todo-list");
//     for (let x of toDoListAlarm.children) {
//         if (+x.id === choosedToDo.id) {
//             x.children[4].classList.remove("hidden");
//         }
//     }
// }
// function checkTime() {
//     const parsedToDosAlarm = JSON.parse(localStorage.getItem("todos"));
//     for (let key in parsedToDosAlarm) {
//         const clockNow = clock.innerHTML.split(':');
//         const clockGoal = parsedToDosAlarm[key].time.split(":");
//         const diffMin = (+clockGoal[0]) * 60 + (+clockGoal[1]) - ((+clockNow[0]) * 60 + (+clockNow[1]));
//         if (diffMin <= 0 && parsedToDosAlarm[key].count === 0) {
//             showSuccessOrNot(parsedToDosAlarm[key]);
//         }
//     }
// }


// function saveToDos() {
//     localStorage.setItem("todos", JSON.stringify(toDos));
// }

// function deleteToDo(event) {
//     const li = event.target.parentElement;
//     toDos = toDos.filter(toDo => toDo.id !== +li.id);
//     li.remove();
//     saveToDos();

// }

// function changeTimeButton(div, parsedToDosTime) {
//     // const timeButton = document.querySelector("`#${id}`");
//     // // // timeButton.innerText = "시간 바꾸기";
    
//     const changedTimeForm = div.parentElement;
//     const changedTimeFormID = changedTimeForm.id;
//     // console.log(changedTimeForm.id);
//     let changeTimeText = 0;
//     for (let x of parsedToDosTime) {
//         if (x.id === +changedTimeFormID) {
//             changeTimeText = x.time;
//         }
//     }
//     changedTimeForm.children[2].innerHTML = `목표 시간 : ${changeTimeText} 까지`;

// }

// function hideTimeForm() {
//     const timeDiv = document.querySelectorAll("#time-div");
//     // timeDiv.setAttribute("class", "hidden");
//     const parsedToDosTime = JSON.parse(localStorage.getItem("todos"));
//     // console.log(parsedToDosTime);
//     for (let key in parsedToDosTime) {
//         if (parsedToDosTime[key].time !== "") {
//             for (let x of timeDiv) {
//                 // console.log(x);
//                 if (+x.parentElement.id === parsedToDosTime[key].id) {
//                     x.classList.add("hidden");
//                     changeTimeButton(x, parsedToDosTime);
//                 }
//             }
//         }
//     }
// }



// function saveTime(event) {
//     // const hideTimeInput = document.querySelector("time-div");
    
//     const parsedToDosTime = JSON.parse(localStorage.getItem("todos"));
//     console.log(parsedToDosTime);
//     const timeId = event.target.parentElement.parentElement;  
//     console.log(timeId);
//     for (let key in parsedToDosTime) {
//         if (parsedToDosTime[key].id === +timeId.id) {
//             parsedToDosTime[key].time = event.target[0].value;
//             console.log(parsedToDosTime[key]);
//         }
//     }
//     toDos = parsedToDosTime;
//     localStorage.setItem("todos", JSON.stringify(parsedToDosTime));
//     hideTimeForm();
// }

// function handleTimeSubmit(event) {
//     event.preventDefault();
//     // console.log(`목표 완료 시간 : ${event.target[1].value}`);
//     saveTime(event);
// }


// function handleSuccess(event) {
//     const li = event.target.parentElement.parentElement;
//     const buttonSet = event.target.parentElement;
//     const parsedToDosSuccess = JSON.parse(localStorage.getItem("todos"));
//     let answer = confirm("목표 시간안에 달성하였습니까?");
//     if (answer) {
//         li.classList.add("success");
//         buttonSet.classList.add("hidden");
//         for (let key in parsedToDosSuccess) {
//             if (parsedToDosSuccess[key].id === +li.id) {
//                 parsedToDosSuccess[key].count = "success";
//                 break;
//             }
//         }
//         localStorage.setItem("todos", JSON.stringify(parsedToDosSuccess));
//         // if (parsedToDos)
//     }
    
    
// }

// function handleMid(event) {
//     const li = event.target.parentElement.parentElement;
//     const buttonSet = event.target.parentElement;
//     const parsedToDosMid = JSON.parse(localStorage.getItem("todos"));
//     let answer = confirm("목표 시간 이후에 달성하였습니까?");
//     if (answer) {
//         li.classList.add("mid");
//         buttonSet.classList.add("hidden");
//         for (let key in parsedToDosMid) {
//             if (parsedToDosMid[key].id === +li.id) {
//                 parsedToDosMid[key].count = "mid";
//                 break;
//             }
//         }
//         localStorage.setItem("todos", JSON.stringify(parsedToDosMid));
//     }
    
// }

// function handleFail(event) {
//     const li = event.target.parentElement.parentElement;
//     const buttonSet = event.target.parentElement;
//     const parsedToDosFail = JSON.parse(localStorage.getItem("todos"));
//     let answer = confirm("하지 않았습니까?");
//     if (answer) {
//         li.classList.add("fail");
//         buttonSet.classList.add("hidden");
//         for (let key in parsedToDosFail) {
//             if (parsedToDosFail[key].id === +li.id) {
//                 parsedToDosFail[key].count = "fail";
//                 break;
//             }
//         }
//         localStorage.setItem("todos", JSON.stringify(parsedToDosFail));
//     }
    
// }

// function makeTime(list) {
//     const time = document.createElement("div");
//     time.setAttribute("id", "time-div");
//     time.setAttribute("class", "hidden");
//     const timeForm = document.createElement("form");
//     const timeInput = document.createElement("input");
//     const timeSubmit = document.createElement("input");

//     const successDiv = document.createElement("div");
//     const successButton = document.createElement("button");
//     successButton.setAttribute("class", "success-button");
//     const failButton = document.createElement("button");
//     failButton.setAttribute("class", "fail-button");
//     const midButton = document.createElement("button");
//     midButton.setAttribute("class", "mid-button");
//     successDiv.appendChild(successButton);
//     successDiv.appendChild(midButton);
//     successDiv.appendChild(failButton);
//     successButton.innerHTML = "✓";
//     midButton.innerHTML = "▵";
//     failButton.innerHTML = "✕";


//     time.appendChild(timeForm);
//     timeForm.appendChild(timeInput);
//     timeForm.appendChild(timeSubmit);
//     list.appendChild(time);
//     list.appendChild(successDiv);
//     successDiv.setAttribute("class", "hidden");
//     successDiv.classList.add("success-div");
//     timeInput.setAttribute("type", "time");
//     timeSubmit.setAttribute("type", "submit");
//     timeInput.setAttribute("required", "");

//     timeForm.addEventListener("submit", handleTimeSubmit);

//     successButton.addEventListener("click", handleSuccess);
//     midButton.addEventListener("click", handleMid);
//     failButton.addEventListener("click", handleFail);
// }

// function showTimeForm(event) {
//     const allLi = document.querySelectorAll("#todo-list li");
//     for (let x of allLi) {
//         if (x.id === event.path[1].id) {
//             console.log(x.children[3].classList.remove('hidden'));
//         }
//     }
//     // if () {

//     // }
// }


// function paintToDo(newTodo) {
//     const li = document.createElement("li");
//     li.id = newTodo.id;
//     const span = document.createElement("span");
//     span.innerText = newTodo.text;
//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "❌";
//     deleteButton.addEventListener("click", deleteToDo);
//     const timeButtonSpan = document.createElement("span");
//     const timeButton = document.createElement("button");
//     timeButton.classList.add("time-button");
//     timeButton.innerText = "시간";


//     // 시간 버튼 누르면, 시간 뜨게 만들기
//     // const timeForm = document.createElement("form");
//     // const selectTime = timeForm.createElement("input");
//     // selectTime.setAttribute('type', 'time');

    

//     li.appendChild(span);
//     li.appendChild(deleteButton);
//     // timeButtonSpan.appendChild(timeButton);
//     li.appendChild(timeButton);
//     makeTime(li);
//     // li.appendChild(time);
//     // time.appendChild(timeButton);
//     // time.appendChild(timeForm);
//     // timeForm.appendChild(selectTime);
//     toDoList.appendChild(li);
//     const showTime = li.querySelector(".time-button");
//     // console.dir(showTime[0].parentElement.id);
//     showTime.addEventListener("click", showTimeForm);
// }

// // function handleTimeSubmit(event) {
// //     event.preventDefault();
// //     console.log()
// // }



// function handleToDoSubmit(event) {
//     if (dayChangeCount !== 1) {
//         event.preventDefault();
//         const newTodo = toDoInput.value;
//         toDoInput.value = "";
//         const newTodoObj = {
//             text: newTodo,
//             id: Date.now(),
//             time: "",
//             count: 0,
//             date: "",
//         };
//         toDos.push(newTodoObj);
//         paintToDo(newTodoObj);
//         saveToDos();
//     } else {
//         confirm("전날 등록을 먼저 해주세요");
//     }


// }


// toDoForm.addEventListener("submit", handleToDoSubmit);


// // selectTime.addEventListener("submit", handleTimeSubmit);


// const savedToDos = localStorage.getItem("todos");
// const parsedToDos = JSON.parse(savedToDos);
// const today = new Date();

// if (savedToDos!== "null") {
//     parsedToDos.forEach(paintToDo);
//     hideTimeForm();
//     paintBack();
//     // showAlarm();

// }
// setInterval(checkTime,1000);
// // setInterval(check)