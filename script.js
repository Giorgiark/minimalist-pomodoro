let timeLeft = 25 * 60; // seconds
let timerInterval;
let currentInterval = 'pomodoro';

const timeLeftEl = document.getElementById('time-left');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroIntervalBtn = document.getElementById('pomodoro-interval-btn');
const shortBreakIntervalBtn = document.getElementById('short-break-interval-btn');
const longBreakIntervalBtn = document.getElementById('long-break-interval-btn');

pomodoroIntervalBtn.addEventListener('click', () => {
    currentInterval = 'pomodoro';
    timeLeft = 25 * 60;
    updateTimeLeftTextContent();
});

shortBreakIntervalBtn.addEventListener('click', () => {
    currentInterval = 'short-break';
    timeLeft = 5 * 60;
    updateTimeLeftTextContent();
});

longBreakIntervalBtn.addEventListener('click', () => {
    currentInterval = 'long-break';
    timeLeft = 10 * 60;
    updateTimeLeftTextContent();
});

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startTimer();
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimeLeftTextContent();
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            if (currentInterval === 'pomodoro') {
                timeLeft = 5 * 60;
                currentInterval = 'short-break';
                startTimer();
            } else if (currentInterval === 'short-break') {
                timeLeft = 10 * 60;
                currentInterval = 'long-break';
                startTimer();
            } else {
                timeLeft = 25 * 60;
                currentInterval = 'pomodoro';
            }
        }
    }, 1000);
}

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    if (currentInterval === 'pomodoro') {
        timeLeft = 25 * 60;
    } else if (currentInterval === 'short-break') {
        timeLeft = 5 * 60;
    } else {
        timeLeft = 10 * 60;
    }
    updateTimeLeftTextContent();
    startStopBtn.textContent = 'Start';
});

function updateTimeLeftTextContent() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
