const fs = require("fs");
const Gpio = require("onoff").Gpio;
const buttonA = new Gpio(17, "in", "both");

const httpHandler = (request, response) => {
  if (request.method === "GET") {
    httpFileServe(request, response, request.url);
  } else {
    httpResponse404(response);
  }
};

const httpFileServe = (request, response, filename) => {
  if (filename === "/") {
    filename = "/index.html";
  }
  console.log("serve file " + filename);

  fs.readFile(__dirname + "html" + filename, function (err, data) {
    if (err) {
      return httpResponse404(response);
    }
    response.writeHead(200);
    response.end(data);
  });
};

const httpResponse404 = (response) => {
  response.writeHead(404);
  return response.end("File not found");
};

const http = require("http").createServer(httpHandler);
const io = require("socket.io")(http);

http.listen(8080);

buttonA.watch((err, value) => {
  if (err) {
    console.error("There was an error ", err);
    return;
  }
  io.emit("buttonA", value);
});
