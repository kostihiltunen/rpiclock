const elBegin = document.getElementById("beginning");
const elGameOn = document.getElementById("gameon");
const elSuccess = document.getElementById("gamesuccess");
const elGameOver = document.getElementById("gameover");

let t;
let solveTime;

const socket = io();

socket.on("buttonA", (pressed, data) => {
  elBegin.style.display = "none";
  elSuccess.style.display = "none";
  elGameOn.style.display = "inline";

  const endTime = new Date().getTime() + 1000 * 60 * 60;

  const timer = () => {
    let now = new Date().getTime();
    t = endTime - now;

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
      elGameOn.style.display = "none";
      elGameOver.style.display = "inline";
    }
  };

  setInterval(timer, 1000);
});

socket.on("buttonB", (pressed, data) => {
  elGameOn.style.display = "none";
  elSuccess.style.display = "inline";
  solveTime = t;
  console.log(solveTime); //for testing purpose
});
