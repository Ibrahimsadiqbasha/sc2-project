// script.js
let timerInterval;
let elapsedTime = 0; // in milliseconds
let running = false;

// DOM Elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startPauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

// Format time helper function
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return {
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        milliseconds: milliseconds.toString().padStart(2, "0"),
    };
}

// Update display
function updateDisplay() {
    const time = formatTime(elapsedTime);
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
    millisecondsDisplay.textContent = time.milliseconds;
}

// Start or pause the timer
function toggleStartPause() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startPauseButton.textContent = "Start";
    } else {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        startPauseButton.textContent = "Pause";
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    updateDisplay();
    startPauseButton.textContent = "Start";
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = "";
}

// Record a lap
function recordLap() {
    const time = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `${time.minutes}:${time.seconds}:${time.milliseconds}`;
    lapsList.appendChild(lapItem);
}

// Event Listeners
startPauseButton.addEventListener("click", toggleStartPause);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
