import history from '../history';
import jwt_decode from "jwt-decode";

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


const GetToken = () =>{
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('state='))
        .split('=')[1];
};

const GetUserObj = () =>{
    return jwt_decode(GetToken());
}

export {Auth,GetToken,GetUserObj}
