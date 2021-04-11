//https://www.valentinog.com/blog/socket-react/
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4002";
const socket = socketIOClient(ENDPOINT);

const trigChange = () => {
  var a = Date();
  socket.emit("FromClient", a);
}

const detectChange= (callback) =>{
  socket.on("FromAPI", data => {
    callback();
  })
}


export {socket, trigChange, detectChange};