let timerInterval;
let totalTime;
let isDarkMode = false; // Variable para controlar el modo

function setTimer(minutes, seconds) {
    totalTime = (minutes * 60) + seconds;
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado!");
            return;
        }
        totalTime--;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    let display;
    if (hours > 0) {
        display = `${ hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
        display = `${minutes}:${String(seconds).padStart(2, '0')}`;
    }
    document.getElementById('timer').textContent = display;
}

function customizeTimer() {
    const modal = new bootstrap.Modal(document.getElementById('customModal'));
    modal.show();
}

function applyCustomTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours < 0 || hours > 24 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    totalTime = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTime > 86400) { // 24 horas en segundos
        alert("El tiempo no puede exceder las 24 horas.");
        return;
    }

    updateTimerDisplay();
    startTimer();
    const modal = bootstrap.Modal.getInstance(document.getElementById('customModal'));
    modal.hide();
}

function toggleTheme() {
    isDarkMode = !isDarkMode; // Cambia el estado del modo
    document.body.classList.toggle('dark', isDarkMode); // Cambia la clase del body

    // Cambia el ícono del botón según el modo
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.classList.toggle('bi-sun', !isDarkMode);
    modeToggle.classList.toggle('bi-moon', isDarkMode);
}