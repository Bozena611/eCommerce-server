const nodemailer = require('nodemailer')
// Import pwd form form mailer where we can hide our mailbox password
const { pwd }    = require('../Modules/pwd.js')

// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
// you need to enable the less secure option on your gmail account
// https://myaccount.google.com/lesssecureapps?pli=1
	service: 'Gmail',
	auth: {
		user: `${'bozena@barcelonacodeschool.com'}`,
		pass: pwd,
	}
});

const send_email = async (req,res) => {
	  const { name , email , subject , message } = req.body
	  const default_subject = 'This is a default subject'
	  const mailOptions = {
		    to: 'bozena@barcelonacodeschool.com',
		    subject: "New message from " + name,
		    html: '<p>'+(subject || default_subject)+ '</p><p><pre>' + message + '</pre></p><p><pre>' + 'From: ' + email + '</pre></p>'

	   }
      try{
           const response = await transport.sendMail(mailOptions)
           console.log('=========================================> Email sent !!')
           return res.json({ok:true,message:'email sent'})
      }
      catch( err ){
           return res.json({ok:false,message:err})
      }
}

module.exports = { send_email }
