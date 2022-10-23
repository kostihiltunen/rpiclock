const elBegin = document.getElementById("beginning");
const elGameOn = document.getElementById("gameon");
const elSuccess = document.getElementById("gamesuccess");
const elGameOver = document.getElementById("gameover");

const socket = io();

socket.on("buttonA", (pressed, data) => {
  elBegin.style.display = "none";
  elSuccess.style.display = "none";
  elGameOn.style.display = "inline";
});

socket.on("buttonB", (pressed, data) => {
  elGameOn.style.display = "none";
  elSuccess.style.display = "inline";
  timer();
});

const endTime = new Date().getTime() + 1000 * 60 * 60;

const timer = setInterval(function () {
  let now = new Date().getTime();
  let t = endTime - now;

  if (t >= 0) {
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((t % (1000 * 60)) / 1000);

    document.getElementById("timer-hours").innerHTML =
      ("0" + hours).slice(-2) + "<span class='label'>HR(S)</span>";

    document.getElementById("timer-mins").innerHTML =
      ("0" + mins).slice(-2) + "<span class='label'>MIN(S)</span>";

    document.getElementById("timer-secs").innerHTML =
      ("0" + secs).slice(-2) + "<span class='label'>SEC(S)</span>";
  } else {
  }
}, 1000);
