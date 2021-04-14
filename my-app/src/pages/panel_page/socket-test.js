//https://www.valentinog.com/blog/socket-react/
import React, { useState, useEffect } from "react";
import { socket, trigChange, detectChange } from "../../component/socket-client/socket-client.js"
import { GetMyEntities } from '../services/authService';
var entitiesID = GetMyEntities();


const App = () => {
  const [response, setResponse] = useState('');
  function toDO() {
    console.log('-')
    console.log('up')
    setResponse(Date())
  }


  // useEffect(() => {
    detectChange(toDO);
  // }, []);

  return (
    <div>
      <button onClick={event => { trigChange(event) }}>CLick me to trigChange</button>
      <p>My ID is: {entitiesID}
        {response}
      </p>
    </div>
  );
}

export default App;


// useEffect(() => {
//   socket.on("FromAPI", data => {
//     setResponse(data);
//   });
//   // CLEAN UP THE EFFECT
//   // return () => socket.disconnect();
//   //
// }, []);