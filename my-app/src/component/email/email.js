import React from 'react';
import emailjs from 'emailjs-com';

//const YOUR_SERVICE_ID = "service_kigbdr9";
//const YOUR_TEMPLATE_ID = "template_c4tbz8f";
//const YOUR_USER_ID = "user_kwKrThl3IGwRCEZNIF8Zc";
// https://dashboard.emailjs.com/admin
// ac: mateiwelcome@gmail.com
// pw: csci3100

function send_validation_email(data) {
console.log(data);
emailjs.send("service_kzjnr6k", "template_gkwgm05", data, "user_ZppA6fucpK6lErmR2miFi")
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}



export {send_validation_email};