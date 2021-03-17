var userState = -1; // -1 not login in, 0 user, 1 rest, 777 is admin
var userobj = {};
const IsLogin = () => {
    if (userState==-1)
        return false;
    else 
        return true;
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


export {IsLogin,ChangeUserState,Set_userobj}
