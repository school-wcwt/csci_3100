//https://www.valentinog.com/blog/socket-react/
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const trigChange = () => {
  var a = Date();
  socket.emit("FromClient", a);
}

function detectChange(callback){
  var a=1;
  socket.on("FromAPI", data => {
    callback();
  })
}


export {socket, trigChange, detectChange};