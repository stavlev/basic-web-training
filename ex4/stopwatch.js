const stopwatchElement = document.getElementById('stopwatch');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');

const resetStopwatch = () => {
    passedMinutes = 0;
    passedSeconds = 0;
    passedMilliseconds = 0;
}

let intervalHandler, passedMinutes, passedSeconds, passedMilliseconds;
resetStopwatch();

const updateStopwatch = () => {
    passedMilliseconds++;

    if (passedMilliseconds >= 1000) {
        passedMilliseconds = 0;
        passedSeconds++;
    }

    if (passedSeconds >= 60) {
        passedSeconds = 0;
        passedMinutes++;
    }

    stopwatchElement.innerHTML = `<p>${passedMinutes}:${passedSeconds}:${passedMilliseconds}</p>`;
}

const enableButtons = (isRunning) => {
    if (isRunning) {
        startButton.setAttribute("disabled", "");
        stopButton.removeAttribute("disabled");
    } else {
        stopButton.setAttribute("disabled", "");
        startButton.removeAttribute("disabled");
    }
}

const startStopwatch = () => {
    resetStopwatch();
    intervalHandler = window.setInterval(updateStopwatch, 1);
    enableButtons(true);
}

const stopStopwatch = () => {
    window.clearInterval(intervalHandler);
    enableButtons(false);
}