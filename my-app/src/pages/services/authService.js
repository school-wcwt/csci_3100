import history from '../history';

/*
    var tmp = document.cookie.split('; ');
    if (tmp == undefined) return "";
    var tmp = tmp.find(row => row.startsWith('state='));
    if (tmp == undefined) return "";
    return tmp.split('=')[1];
*/

const GetMyEntities = () =>{
    const itemkey = "state=";
    const idx = document.cookie.search(itemkey);
    if (idx==-1)   return "empty"
    return document.cookie.substr(idx+itemkey.length,document.cookie.length).split('; ')[0];
}

const GetMyUser = () =>{
    const itemkey = "myuser=";
    const idx = document.cookie.search(itemkey);
    if (idx==-1)   return "empty"
    return JSON.parse(document.cookie.substr(idx+itemkey.length,document.cookie.length).split('; ')[0]);

}

const Auth = () =>{
    if (GetMyEntities() == "" || GetMyEntities() == "empty" )
        history.push('/login');
}


export {Auth,GetMyEntities,GetMyUser}
