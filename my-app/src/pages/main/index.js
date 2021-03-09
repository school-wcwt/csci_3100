import React from 'react';
import PrimarySearchAppBar from './component/appBar/appBar.js';
//import TopHead from './component/topHead/topHead.js';
import {UserValidation} from '../../component/email/email';
const Main = ()=>{
    return (
        <div>
            <PrimarySearchAppBar/>
            <UserValidation UserName="Tom Wong" UserEmail = "a1336867016@gmail.com" PassCode = "I am The King"/>
        </div>        
    )
}

export default Main;
