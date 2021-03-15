import React from 'react';
import emailjs from 'emailjs-com';

const YOUR_SERVICE_ID = "service_kigbdr9";
const YOUR_TEMPLATE_ID = "template_c4tbz8f";
const YOUR_USER_ID = "user_kwKrThl3IGwRCEZNIF8Zc";
// https://dashboard.emailjs.com/admin
function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(`${YOUR_SERVICE_ID}`, `${YOUR_TEMPLATE_ID}`, e.target, `${YOUR_USER_ID}`)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  function send_validation_email(e) {
    //e.preventDefault();
    emailjs.sendForm("service_kigbdr9", "template_c4tbz8f", e.target, "user_kwKrThl3IGwRCEZNIF8Zc")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }


const UserValidation = ({UserName,UserEmail,PassCode}) => {
  console.log("ined");
	return (
		<form className="contact-form" onSubmit={send_validation_email}>
		<input type="hidden" name="to_name" value = {UserName}/>
		<input type="hidden" name="user_email" value = {UserEmail}/>
		<input type="hidden" name="message" value = {PassCode}/>
		<input type="submit" value="Send" />
	  </form>
	);
}
export {UserValidation,send_validation_email};