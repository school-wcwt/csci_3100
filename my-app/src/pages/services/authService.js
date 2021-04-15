import { useEffect, useState } from 'react';
import history from '../history';
import axios from '../../axiosConfig';
import { useLocation } from 'react-router-dom'
import { LaptopWindows } from '@material-ui/icons';
const entityFn = require("../../component/load_backend/entityFunction");

/*
    var tmp = document.cookie.split('; ');
    if (tmp == undefined) return "";
    var tmp = tmp.find(row => row.startsWith('state='));
    if (tmp == undefined) return "";
    return tmp.split('=')[1];
*/

function parseCookie(cookies) {
    var output = {};
    cookies.split(/\s*;\s*/).forEach(pair => {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair.splice(1).join('=');
    });
    return output;
}

const GetMyEntities = () =>{
    const itemkey = "state=";
    const idx = document.cookie.search(itemkey);
    if (idx==-1)   return "empty"
    return document.cookie.substr(idx+itemkey.length,document.cookie.length).split('; ')[0];
}

const GetMyUser = () =>{
    return new Promise((resolve,reject)=>{
        entityFn.entity_get(GetMyEntities())
        .then(res=> {
            return resolve(res);
        })
        .catch(err =>{
            return reject(err);
        });
    })
}

const Auth = () =>{
    if (GetMyEntities() == "" || GetMyEntities() == "empty" )
        history.push('/login');
}

const useLoginUser = () => {
    const [user, setUser] = useState(null);
    const path = useLocation();
    const pathName = path.pathname;
    console.log(pathName)

    const refresh = () => {
        axios.post('/refresh')
        .then(res => axios.get(`/entity/${res.data.entityID}`))
        .then(res => setUser(res.data))
    }
    
    const forceRefresh = () => {
        refresh()
    }

    useEffect(() => {
        const cookies = parseCookie(document.cookie)
        console.log(cookies);
        if (user == null && window.location.pathname.startsWith('/auth'))
            return;
        if (user == null && cookies.refresh_token == undefined)
            history.push('/login');
        else if (user == null && cookies.refresh_token !== undefined)
            refresh();
    }, [])



    return {
        user,
        setUser,
        forceRefresh,
    }
}


export {Auth,GetMyEntities,GetMyUser, useLoginUser}
