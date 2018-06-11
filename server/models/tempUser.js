const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tempUserSchema = new Schema({
  email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	tagLine: {
		type: String,
		default: "Available"
	},
	img: {
		type: String
	},
	friends: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'post'
	}],
	pages: [{
		type: mongoose.Schema.ObjectId,
		ref: 'page'
	}],
	notifications: [{
		type: mongoose.Schema.ObjectId,
		ref: 'notofication'
	}],
	location: {
		type: String,
	},
	phone: {
		type: String
	},
	gender: {
		type: String,
	},
	dob: {
		type: Date,
	},
	school: {
		type: String
	},
  verificationUrl: {
    type: String
  }
});

var TempUser = mongoose.model('tempUser', tempUserSchema);

module.exports = TempUser;
