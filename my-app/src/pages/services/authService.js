import history from '../history';
import {Redirect} from 'react-router-dom'
//var userState = document.cookie.split("; ")[1];

const IsLogin = () => {
    const state = document.cookie.split("; ")[1];
    if (state != "empty")
        return true;
    return false;
}

const Auth = () =>{
    console.log("I am in and state is " + IsLogin());
    if (!IsLogin())
        history.push('./login');
}

export {IsLogin,Auth}
