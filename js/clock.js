// const clock = document.querySelector("h2#clock");
// const day = document.querySelector("h2#day");
// let dayChangeCount = 0;
const toDoList = document.querySelector(".todo-list");
const timeContainer = document.querySelector(".time-container");
let timeText = timeContainer.children[0];

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const month = date.getMonth();
    const whatdate = date.getDate();
    const whatday = date.getDay();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    timeText.innerText = `${month+1}/${whatdate} ${days[whatday]} ${hours}:${minutes}:${seconds}`;

    if (date.getDate() !== +localStorage.getItem("date")) {
        localStorage.setItem("daychange", "1");
    }

    // if (date.getMinutes() !== +localStorage.getItem("date")) {
    //     localStorage.setItem("daychange", "1");
    // }

    if (localStorage.getItem("todos")) {
        if (+localStorage.getItem("daychange") === 1) {
            //하루가 바뀌었으면,
            let parsedToDosClock = JSON.parse(localStorage.getItem("todos"));
            let checkDayChange = 1;
            for (let x of parsedToDosClock) {
                if (+x.count === 0) {
                    checkDayChange = 0;
                    console.log(x);
                    break;
                }
            }
            if (checkDayChange === 1) {
                localStorage.setItem("daychange", "0");
                localStorage.setItem("date", date.getDate());
                localStorage.setItem("todos", "[]");
                for (let y of toDoList.children) {
                    y.remove();
                }
                handleDayChange();
            }
    
        }
    }


    // const parsedToDosClock = JSON.parse(localStorage.getItem("todos"));
    // if (`${month+1}/${whatdate}` !== localStorage.getItem("date")) {
    //     //날짜 바뀌면
    //     dayChangeCount = 1;
    // }
    // day.innerText = `${month+1}/${whatdate} ${days[whatday]}`;
    // localStorage.setItem("date", `${month+1}/${whatdate}`);
    // parsedToDosClock[date] = `${month+1}${whatdate}`;
    // for (let key in parsedToDosClock) {
    //     parsedToDosClock[key].date = `${month+1}${whatdate}`;
    // }
    // localStorage.setItem("todos", JSON.stringify(parsedToDosClock));
    
}   

getClock();
setInterval(getClock, 1000);