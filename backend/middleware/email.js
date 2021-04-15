const { SMTPClient } = require('emailjs');

const client = new SMTPClient({
	user: 'mate_welcome@outlook.com',
	password: 'csci3100e6mATE',
	host: 'smtp-mail.outlook.com',
    tls: {
		ciphers: 'SSLv3',
	},
});

function sendAuthEmail(name, tag, entityID, email,  link) {
    
    client.send({
        text: `Hello ${name},


    Welcome to be a part of mATE, where you can find your friends and dine!  
        
    This is your tag: #${tag}. You can be identified by the link /profile/${entityID}. But first, let us be your first friend. Click the following link to authenticate your email:
        
    ${link}
        
    See you soon!
        
        
Best wishes,
mATE team`,
        from: 'mate_welcome@outlook.com',
        to: `${name} <${email}>`,
        subject: 'Welcome to mATE!'
    }, (err, message) => {
        console.log(err || message);
    });
}


module.exports = { sendAuthEmail };