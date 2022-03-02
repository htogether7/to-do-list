const saveButton = document.querySelector("#save-button");
const dayBox = document.querySelector(".day-box");
// const showWeek = Array.from({length:7}, ()=>"Not Today");
const todayTask = document.querySelector(".today-task");
const firstDay = document.querySelector("#first-day");
const secondDay = document.querySelector("#second-day");
const thirdDay = document.querySelector("#third-day");
const fourthDay = document.querySelector("#fourth-day");
const fifthDay = document.querySelector("#fifth-day");
const sixthDay = document.querySelector("#sixth-day");
const seventhDay = document.querySelector("#seventh-day");

function changeWeek () {
    let dayList = [firstDay, secondDay, thirdDay, fourthDay, fifthDay, sixthDay, seventhDay];
    for (let i = 0; i < JSON.parse(localStorage.getItem("week")).length; i++) {
        let successCount = JSON.parse(localStorage.getItem("week"))[i][0];
        let midCount = JSON.parse(localStorage.getItem("week"))[i][1];
        let failCount = JSON.parse(localStorage.getItem("week"))[i][2];
        let sumCount = successCount + failCount + 2*midCount;
        let green = successCount + midCount;
        let red = failCount + midCount;
        if (successCount === failCount) {
            dayList[i].style.backgroundColor = "rgb(255, 255, 0)";
        } else if (successCount > failCount) {
            dayList[i].style.backgroundColor = `rgb(${Math.round(255*(red/green))}, 255, 0)`;
        } else if (successCount < failCount) {
            dayList[i].style.backgroundColor = `rgb(255, ${Math.round(255*(green/red))}, 0)`;
        }
    }
}

function changeTodayTask () {
    let changePresentCondition = JSON.parse(localStorage.getItem("today"));
    let successCount = changePresentCondition[0];
    let midCount = changePresentCondition[1];
    let failCount = changePresentCondition[2];
    let sumCount = successCount + failCount + 2*midCount;
    let green = successCount + midCount;
    let red = failCount + midCount;

    if (successCount === failCount) {
        todayTask.style.backgroundColor = "rgb(255, 255, 0)";
    } else if (successCount > failCount) {
        todayTask.style.backgroundColor = `rgb(${Math.round(255*(red/green))}, 255, 0)`;
        console.log(`rgb(${Math.round(255*(red/green))}, 255, 0)`);
    } else if (successCount < failCount) {
        todayTask.style.backgroundColor = `rgb(255, ${Math.round(255*(green/red))}, 0)`;
        console.log(`rgb(255, ${Math.round(255*(green/red))}, 0)`);
    }

    // todayTask.style.backgroundColor = `rgb(${im},0,255)`;
}


function saveToday (event) {
    // const showToday = {
    //     success : [],
    //     mid : [],
    //     fail : [],
    // }
    let presentCondition = JSON.parse(localStorage.getItem("today"));
    let week = JSON.parse(localStorage.getItem("week"));
    const saveAnswer = confirm("오늘 한 일을 저장하시겠습니까?");
    const parsedToDosSave = JSON.parse(localStorage.getItem("todos"));
    let tmp = [];
    console.log(parsedToDosSave);
    if (saveAnswer) {
        for (let key in parsedToDosSave) {
            if (parsedToDosSave[key].count === "success" || parsedToDosSave[key].count === "fail" || parsedToDosSave[key].count === "mid") {
                for (let i = 0; i < toDoList.children.length; i++) {
                    if (+toDoList.children[i].id === parsedToDosSave[key].id) {
                        // toDoList.children[i].classList.add("hidden");
                        // parsedToDosSave.splice(key, 1);
                        // localStorage.setItem("todos", JSON.stringify(parsedToDosSave)); // 이거 뭔코드지?
                        console.log(toDoList.children[i]);
                        if (toDoList.children[i].classList.contains("success") && !toDoList.children[i].classList.contains("saved")) {
                            toDoList.children[i].classList.add("saved");
                            presentCondition[0]++;
                        } else if (toDoList.children[i].classList.contains("mid") && !toDoList.children[i].classList.contains("saved")) {
                            toDoList.children[i].classList.add("saved");
                            presentCondition[1]++;
                        } else if (toDoList.children[i].classList.contains("fail") && !toDoList.children[i].classList.contains("saved")) {
                            toDoList.children[i].classList.add("saved");
                            presentCondition[2]++;
                        }
                        localStorage.setItem("today", JSON.stringify(presentCondition));
                        if (toDoList.children[i].classList.contains("success") || toDoList.children[i].classList.contains("mid") || toDoList.children[i].classList.contains("fail")) {
                            tmp.push(+toDoList.children[i].id);
                        }
                        
                        console.log(toDoList.children[i]);

                        // delete toDoList.children[i];
                        // console.log(toDoList);
                        // dayBox.children[6].classList.add("save");
                        // todayTask.classList.add("save");
                    }
                }

                
                // toDoList.children = (Array.from(toDoList.children).filter((li, index) => !tmp.includes(index)));

                // for (let i = 0; i < toDoList.children.length; i++) {
                //     if (tmp.includes(i)) {
                //         toDoList.children[i].remove();
                //     }
                // }
                
                // for (let i = 0; i < tmp.length; i++) {
                //     toDoList.children[i].remove();
                // }

            }
            // console.log(parsedToDosSave[key].count);
        }
        // for (let x of tmp) {
        //     console.log("now", x);
        //     for (let j = 0; j < toDoList.children.length; j++) {
        //         if (x === +toDoList.children[j].id) {
        //             toDoList.children[j].remove();
        //             // break;
        //         }
        //     }
        // }
    //     console.log(showToday);
    
        // console.log(tmp);
        // console.log(presentCondition);
        // console.log(week);

        changeTodayTask();

    }
    if (dayChangeCount === 1) {
        seventhDay.style.backgroundColor = `${todayTask.style.backgroundColor}`;
        let weekChange = JSON.parse(localStorage.getItem("week"));
        weekChange.shift();
        weekChange.push(JSON.parse(localStorage.getItem("today")));
        localStorage.setItem("week", JSON.stringify(weekChange));
        changeWeek();
        localStorage.setItem("today", "[0,0,0]");
        localStorage.setItem("todos", "[]");
        for (let x of document.querySelector("#todo-list").children) {
            x.remove();
        }
        changeTodayTask();
        dayChangeCount = 0;
    }
}
if (localStorage.getItem("today")) {
    window.onbeforeunload = changeTodayTask();
    window.onbeforeunload = changeWeek();
}

saveButton.addEventListener("click", saveToday);