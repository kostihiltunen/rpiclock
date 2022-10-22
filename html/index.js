const socket = io();
socket.on("buttonA", (pressed, data) => {
  const elBegin = document.getElementById("beginningscreen");
  const elGame = document.getElementById("gameonscreen");
  elBegin.style.display = "none";
  elGame.style.display = "inline";
});