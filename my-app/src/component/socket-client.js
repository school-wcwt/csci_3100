//https://www.valentinog.com/blog/socket-react/
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

/**
 * send message to socket.io when something is updated
 */
const trigChange = () => {
  var a = Date();
  socket.emit("FromClient", a);
}

/**
 * detect message from socket.io. Once detected, callback function is called
 * @param   {function} callback  function to be called
 * @param   {any} parameter  parameter of the function
 */
const detectChange= (callback, param) =>{
  socket.on("FromAPI", data => {
    callback(param);
  })
}


export {socket, trigChange, detectChange};