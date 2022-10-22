const elBegin = document.getElementById("beginningscreen");
const elGame = document.getElementById("gameonscreen");
const socket = io();

socket.on("buttonA", (pressed, data) => {
  elBegin.style.display = "none";
  elGame.style.display = "inline";
});

socket.on("buttonB", (pressed, data) => {
  elBegin.style.display = "inline";
  elGame.style.display = "none";  
});