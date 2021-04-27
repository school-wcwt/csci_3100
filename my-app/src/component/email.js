import React from 'react';
import emailjs from 'emailjs-com';

const YOUR_SERVICE_ID = "service_kzjnr6k";
const YOUR_USER_ID = "user_ZppA6fucpK6lErmR2miFi";
// https://dashboard.emailjs.com/admin
// ac: mateiwelcome@gmail.com
// pw: csci3100

function send_validation_email(data) {
    /*--data required--
    user_email,to_name
    */
emailjs.send(YOUR_SERVICE_ID, "template_gkwgm05", data, YOUR_USER_ID)
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}
function resvEmail(data){
    /* --data required--
    user_email,rest_email,to_name,RestaurantName,Time,Remarks
    */
    return new Promise((resolve,reject)=>{
        emailjs.send(YOUR_SERVICE_ID, "template_bi4dcyr", data, YOUR_USER_ID)
        .then ( res =>{
            return resolve(res);
        })
        .catch(err => {
            return reject(err)
        })
    })
} 


export default resvEmail;