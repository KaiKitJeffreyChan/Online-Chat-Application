const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

//specify port
const PORT = process.env.PORT || 5000;

const router = require("./router");

//initialize express
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("we have connection");

  //defines an "endpoint" where info can be sent from client side
  //callback is whats send to client side
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}`,
    });
    //message to everyone but the user
    socket
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}. has joined!` });
    socket.join(user.room);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log("this is socketid", socket.id);
    const user = getUser(socket.id);
    console.log("this is user", user);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("user has left");
  });
});
//passing middleware router component

app.use(router);
app.use(cors());
//runs server
//1st param is port
//2nd function
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

//real time messaging
//create simple router as new component
