const crypto = require('crypto');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const mail = require('../handlers/mail')

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed auth(',
	successFlash: 'Auth done!))',
	successRedirect: '/'
})

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Logged out(((')
	res.redirect('/')
}


exports.isLoggedIn = (req, res, next) => {
	if (!req.user) {
		res.redirect('/register')
		return
	}
	next()
}

exports.forgot = async (req, res) => {
	const user = await User.findOne({email: req.body.email})

	if(!user) {
		req.flash('error', 'There is not this email')
		res.redirect('/login')
	}

	user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
	user.resetPasswordExpires = Date.now() + 3600000;
	await user.save();


	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	await mail.send({
		user,
		subject: 'Password Reset Mail',
		resetURL,
		filename: 'password-reset'
	});

	req.flash('success', `Email is sent to your mail account!))`)

	res.redirect('/login')
}