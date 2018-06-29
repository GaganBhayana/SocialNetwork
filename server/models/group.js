const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var groupSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
  	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'post'
	}],
	owner : {
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

var Group = mongoose.model('group', groupSchema);

module.exports = Group;
