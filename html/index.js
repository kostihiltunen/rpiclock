const elBegin = document.getElementById("beginning");
const elGameOn = document.getElementById("gameon");
const elSuccess = document.getElementById("gamesuccess");
const elGameOver = document.getElementById("gameover");

const socket = io();

socket.on("buttonA", (pressed, data) => {
  elBegin.style.display = "none";
  elGameOn.style.display = "inline";
});

socket.on("buttonB", (pressed, data) => {
  elGameOn.style.display = "none";
  elSuccess.style.display = "inline";
});
