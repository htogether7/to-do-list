const clock = document.querySelector("h2#clock");
const day = document.querySelector("h2#day");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const month = date.getMonth();
    const whatdate = date.getDate();
    const whatday = date.getDay();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    day.innerText = `${month+1}/${whatdate} ${days[whatday]}`;
}

getClock();
setInterval(getClock, 1000);