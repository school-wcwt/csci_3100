import history from '../history';


var userState = 77; // -1 not login in, 0 user, 1 rest, 777 is admin
var userobj = {};
const IsLogin = () => {
    if (document.cookie == "user" || document.cookie == "rest" )
        return true;
    return false;
}

const auth = () =>{
    console.log("state is " + IsLogin());
    if (IsLogin())
        history.push('/main');
    else
        history.push('/login');
}

const ChangeUserState = (newstate) => {
    if (newstate == "user" || newstate == 0)
        userState = 0;
    else if (newstate == "rest" || newstate == 1)
        userState = 1;
    return true;
};

const Set_userobj = (obj) => {
    userobj = obj;
}


export {IsLogin,auth,ChangeUserState,Set_userobj}
