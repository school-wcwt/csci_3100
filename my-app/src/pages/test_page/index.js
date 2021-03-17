import React from 'react';
import {send_validation_email} from '../../component/email/email.js';
import {ChangeUserState,IsLogin,Set_userobj} from '../services/authService';
import MainCarousel from '../../component/carousel/MainCarousel'


const TestPage = ()=>{
    const emaildata = {
        to_name:"handsome",
        user_email: "a1336867016@gmail.com",
        message: "I am the best"
    }
    console.log(IsLogin());
    return (
        <MainCarousel/>       
    )
}

export default TestPage;
