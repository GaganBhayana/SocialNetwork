const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var groupSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	descriptiion: {
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
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}]
});

var Group = mongoose.model('group', groupSchema);

module.exports = Group;