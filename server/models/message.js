const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
	email:{
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date
	}
});

var Message = mongoose.model('message', messageSchema);

module.exports = Message;