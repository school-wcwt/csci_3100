//https://www.valentinog.com/blog/socket-react/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

//connect
//message from FromClient means: something is updated
//message from FromAPI: tell other clients to update
//details in my-app
io.on("connection", (socket) => {
  console.log('New Connection')
  socket.on("FromClient", data => {
    console.log('hey')
    io.emit("FromAPI", Date())
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});

server.listen(port, () => console.log(`Listening on port ${port}`));