const firstDay = document.querySelector(".first-day");
const secondDay = document.querySelector(".second-day");
const thirdDay = document.querySelector(".third-day");
const fourthDay = document.querySelector(".fourth-day");
const fifthDay = document.querySelector(".fifth-day");
const sixthDay = document.querySelector(".sixth-day");
const seventhDay = document.querySelector(".seventh-day");


function colorWeek() {
    const days = [firstDay, secondDay, thirdDay, fourthDay, fifthDay, sixthDay, seventhDay];
    for (let i = 0; i <= 6; i++) {
        let todayCondition = JSON.parse(localStorage.getItem("week"))[i];
        let successCount = todayCondition[0];
        let failCount = todayCondition[2];
        let midCount = todayCondition[1];
        let sumCount = successCount + failCount + 2*midCount;
        let green = successCount + midCount;
        let red = failCount + midCount;
        if (successCount === failCount) {
            days[i].style.backgroundColor = "rgb(255, 255, 0)";
        } else if (successCount > failCount) {
            days[i].style.backgroundColor = `rgb(${Math.round(255*(red/green))}, 255, 0)`;
        } else if (successCount < failCount) {
            days[i].style.backgroundColor = `rgb(255, ${Math.round(255*(green/red))}, 0)`;
        }
    }
}

function colorToday() {
    let todayCondition = JSON.parse(localStorage.getItem("week"))[6];
    let successCount = todayCondition[0];
    let failCount = todayCondition[2];
    let midCount = todayCondition[1];
    let sumCount = successCount + failCount + 2*midCount;
    let green = successCount + midCount;
    let red = failCount + midCount;
    if (successCount === failCount) {
        seventhDay.style.backgroundColor = "rgb(255, 255, 0)";
    } else if (successCount > failCount) {
        seventhDay.style.backgroundColor = `rgb(${Math.round(255*(red/green))}, 255, 0)`;
    } else if (successCount < failCount) {
        seventhDay.style.backgroundColor = `rgb(255, ${Math.round(255*(green/red))}, 0)`;
    }
}

