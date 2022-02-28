const saveButton = document.querySelector("#save-button");
const dayBox = document.querySelector(".day-box");
// const showWeek = Array.from({length:7}, ()=>"Not Today");
const todayTask = document.querySelector(".today-task");



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
                        if (toDoList.children[i].classList.contains("success")) {
                            presentCondition[0]++;
                        } else if (toDoList.children[i].classList.contains("mid")) {
                            presentCondition[1]++;
                        } else if (toDoList.children[i].classList.contains("fail")) {
                            presentCondition[2]++;
                        }
                        localStorage.setItem("today", JSON.stringify(presentCondition));

                        tmp.push(+toDoList.children[i].id);
                        console.log(toDoList.children[i]);

                        // delete toDoList.children[i];
                        // console.log(toDoList);
                        // dayBox.children[6].classList.add("save");
                        todayTask.classList.add("save");
                    }
                }
                for (let x of tmp) {
                    console.log("now", x);
                    for (let j = 0; j < toDoList.children.length; j++) {
                        if (x === +toDoList.children[j].id) {
                            toDoList.children[j].remove();
                            // break;
                        }
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
                for (let x of tmp) {

                }

            }
            // console.log(parsedToDosSave[key].count);
        }
    //     console.log(showToday);
    
        console.log(tmp);
        console.log(presentCondition);
        console.log(week);
    }
}

saveButton.addEventListener("click", saveToday);