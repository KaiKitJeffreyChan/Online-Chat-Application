const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { Console } = require("console");

//specify port
const PORT = process.env.PORT || 5000;

const router = require("./router");

//initialize express
const app = express();
const server = http.createServer(app);

// instance of socketio
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("we have connection");
  socket.on("disconnect", () => {
    console.log("user has left");
  });
});
//passing middleware router component
app.use(router);

//runs server
//1st param is port
//2nd function
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

//real time messaging
//create simple router as new component
