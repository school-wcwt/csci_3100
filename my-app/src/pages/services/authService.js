import history from '../history';
//var userState = document.cookie.split("; ")[1];

const IsLogin = () => {
    const state = document.cookie.split("; ")[1];
    if (state == "user" || state == "rest" ||true)
        return true;
    return false;
}

const auth = () =>{
    console.log("state is " + IsLogin());
    console.log("cookies is " + document.cookie.split(";")[1]);
    if (IsLogin())
        history.push('/main');
    else
        history.push('/login');
}

export {IsLogin,auth}
