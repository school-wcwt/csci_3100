var userState = 1; // -1 not login in, 0 user, 1 rest, 777 is admin

const IsLogin = () => {
    if (userState==-1)
        return false;
    else 
        return true;
}

const ChangeUserState = ({newstate}) => {
    userState = newstate;
    return true;
}

export {IsLogin,ChangeUserState}
