const weekTask = document.querySelector(".week-task");

function handleDayChange() {
    let parsedToDosDayChange = JSON.parse(localStorage.getItem("week"));
    for (let i = 0; i <= 5; i++) {
        parsedToDosDayChange[i] = parsedToDosDayChange[i+1];
    }
    parsedToDosDayChange[6] = [0,0,0];
    localStorage.setItem("week", JSON.stringify(parsedToDosDayChange));
    colorWeek();
}