import history from '../history';
import jwt_decode from "jwt-decode";

const GetToken = () =>{
    var tmp = document.cookie.split('; ');
    if (tmp == undefined) return "";
    var tmp = tmp.find(row => row.startsWith('state='));
    if (tmp == undefined) return "";
    return tmp.split('=')[1];

};

const GetUserObj = () =>{
    const token = GetToken();
    if (token == "" || token == "empty") return "";
    return jwt_decode(token);
}

const Auth = () =>{
    if (GetToken() == "" || GetToken() == "empty" )
        history.push('/login');
}

const PrintUserObj = () =>{
    console.log("log in authservice: " + JSON.stringify(GetUserObj()) + "\n");
}

export {Auth,GetToken,GetUserObj,PrintUserObj}
