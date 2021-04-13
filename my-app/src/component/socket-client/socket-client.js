//https://www.valentinog.com/blog/socket-react/
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const trigChange = () => {
  var a = Date();
  socket.emit("FromClient", a);
}

const detectChange= (callback, param) =>{
  socket.on("FromAPI", data => {
    callback(param);
  })
}


export {socket, trigChange, detectChange};