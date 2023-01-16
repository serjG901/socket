const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let messages = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  let msgToSend = JSON.stringify({ messages });
  io.emit("con", msgToSend);

  socket.on("chat message", (msg) => {
    messages.push(msg);
    let msgToSend = JSON.stringify({ messages });
    io.emit("chat message", msgToSend);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
