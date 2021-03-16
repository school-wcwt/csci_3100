var userState = 777; // -1 not login in, 0 user, 1 rest, 777 is admin
const dev_user_ac = "mateWelcome@gmail.com";
const dev_user_pw = "P@ssw0rd";

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

export {IsLogin,ChangeUserState,dev_user_ac,dev_user_pw}
