import React from 'react';
import {send_validation_email} from '../../component/email/email.js';


/*
          <input type="text" name="to_name" />
          <input type="text" name="user_email" />
          <input type="text" name="message" />
          <input type="submit" value="Send" />
*/

const TestPage = ()=>{
    const emaildata = {
        to_name:"handsome",
        user_email: "a1336867016@gmail.com",
        message: "I am the best"
    }
    return (
        <div>
            <send_validation_email data = {emaildata}/>
        </div>        
    )
}

export default TestPage;
