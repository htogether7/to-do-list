const calendarButton = document.querySelector("#calendar-button");


function handleCalendarButtonClick() {
    window.open("calendar.html");
}


calendarButton.addEventListener("click", handleCalendarButtonClick);