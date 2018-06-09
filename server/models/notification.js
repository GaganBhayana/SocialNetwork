const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
	title: {
		type: String,
		required: true
	}, 
	content:{
		type: String,
		required: true 
	},
	date: {
		type: Date
	},
	img: {
		type: String
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true
	}

});

var Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
