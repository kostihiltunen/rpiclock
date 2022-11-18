// number elements to be populated with timer information
const elTimerHours = document.getElementById("timer-hours");
const elTimerMins = document.getElementById("timer-mins");
const elTimerSecs = document.getElementById("timer-secs");

// number elements that are showing in the beginning
const elEmptyHours = document.getElementById("empty-hours");
const elEmptyMins = document.getElementById("empty-mins");
const elEmptySecs = document.getElementById("empty-secs");

// text elements that change depending on the state of the game
const elInfoTextFi = document.getElementById("info-text-fi");
const elInfoTextEn = document.getElementById("info-text-en");
const elInfoWarningFi = document.getElementById("info-warning-fi");
const elInfoWarningEn = document.getElementById("info-warning-en");
const elInfoSuccessFi = document.getElementById("info-success-fi");
const elInfoSuccessEn = document.getElementById("info-success-en");
const elInfoGameoverFi = document.getElementById("info-gameover-fi");
const elInfoGameoverEn = document.getElementById("info-gameover-en");

elInfoWarningFi.style.display = "none";
elInfoWarningEn.style.display = "none";
elInfoSuccessFi.style.display = "none";
elInfoSuccessEn.style.display = "none";
elInfoGameoverFi.style.display = "none";
elInfoGameoverEn.style.display = "none";

elTimerHours.style.display = "none";
elTimerMins.style.display = "none";
elTimerSecs.style.display = "none";

let t;
let solveTime;
let buttonAPressed = false;
let buttonBPressed = true;
let theTimer;
let gameStarted = false;

const socket = io();

socket.on("buttonA", (pressed, data) => {
  buttonBPressed = false;
  clearInterval(theTimer);
  if (gameStarted === false) {
    gameStarted = true;
    gameOn();
  }
  const endTime = new Date().getTime() + 1000 * 60 * 60.02;

  const timer = () => {
    let now = new Date().getTime();
    t = endTime - now;

    if (t >= 0) {
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60.02));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);

      document.getElementById("timer-hours").innerHTML = ("0" + hours).slice(
        -2
      );
      document.getElementById("timer-mins").innerHTML = ("0" + mins).slice(-2);
      document.getElementById("timer-secs").innerHTML = ("0" + secs).slice(-2);
    } else {
      gameOver();
      buttonBPressed = true;
    }
  };
  theTimer = setInterval(timer, 1000);
});

socket.on("buttonB", (pressed, data) => {
  if (buttonBPressed === false) {
    buttonBPressed = true;
    gameStarted = false;
    gameSuccess();
    solveTime = t; //for later use
    // console.log(solveTime);
    clearInterval(theTimer);
  }
});

socket.on("buttonC", (pressed, data) => {
  clearInterval(theTimer);
  gameReset();
  gameStarted = false;
  buttonAPressed = false;
  buttonBPressed = true;
});

const gameOn = () => {
  elInfoTextFi.style.display = "none";
  elInfoTextEn.style.display = "none";
  // elSuccessFi.style.display = "none";
  // elSuccessEn.style.display = "none";
  elInfoWarningFi.style.display = "inline";
  elInfoWarningEn.style.display = "inline";
  elEmptyHours.style.display = "none";
  elEmptyMins.style.display = "none";
  elEmptySecs.style.display = "none";
  elTimerHours.style.display = "inline";
  elTimerMins.style.display = "inline";
  elTimerSecs.style.display = "inline";
  elTimerHours.style.color = "#35FA00";
  elTimerMins.style.color = "#35FA00";
  elTimerSecs.style.color = "#35FA00";
  elTimerHours.style.textShadow = "0 0 3px #000000";
  elTimerMins.style.textShadow = "0 0 3px #000000";
  elTimerSecs.style.textShadow = "0 0 3px #000000";
};

const gameSuccess = () => {
  elInfoWarningFi.style.display = "none";
  elInfoWarningEn.style.display = "none";
  elInfoSuccessFi.style.display = "inline";
  elInfoSuccessEn.style.display = "inline";
};

const gameOver = () => {
  elInfoWarningFi.style.display = "none";
  elInfoWarningEn.style.display = "none";
  elInfoGameoverFi.style.display = "inline";
  elInfoGameoverEn.style.display = "inline";
};

const gameReset = () => {
  elInfoWarningFi.style.display = "none";
  elInfoWarningEn.style.display = "none";
  elInfoSuccessFi.style.display = "none";
  elInfoSuccessEn.style.display = "none";
  elInfoGameoverFi.style.display = "none";
  elInfoGameoverEn.style.display = "none";

  elTimerHours.style.display = "none";
  elTimerMins.style.display = "none";
  elTimerSecs.style.display = "none";

  elInfoTextFi.style.display = "inline";
  elInfoTextEn.style.display = "inline";

  elEmptyHours.style.display = "inline";
  elEmptyMins.style.display = "inline";
  elEmptySecs.style.display = "inline";
};
