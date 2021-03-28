import history from '../history';
//var userState = document.cookie.split("; ")[1];

const IsLogin = () => {
    const state = document.cookie.split("; ")[1];
    if (state == "user" || state == "rest")
        return true;
    return false;
}

const auth = () =>{
    if (IsLogin())
        history.push('/main');
    else
        history.push('/login');
}

export {IsLogin,auth}
