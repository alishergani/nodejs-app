const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); 
const promisify = require('es6-promisify');
const htmlToText = require('html-to-text');

const transport = nodemailer.createTransport({
 service: 'gmail',
 auth: {
	  user: process.env.MAIL_USER,
  	pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options ={}) => {
	const html = juice(pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options));
	console.log(html);
	return html;
}


exports.send = async (options) => {
	const html = generateHTML(options.filename, options);
	const text = htmlToText.fromString(html); 
	const mailOptions = {
	  from: 'Alisher Gani <ka4anbek@gmail.com>', // sender address
	  to: options.user.email, // list of receivers
	  subject: options.subject, // Subject line
	  html,
	  text
	};

	const sendMail = promisify(transport.sendMail, transport);
	return sendMail(mailOptions);
}