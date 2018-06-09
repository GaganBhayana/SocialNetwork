const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pageSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	descriptiion: {
		type: String,
		required: true
	},
	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'post'
	}],
	owner : {
		type: mongoose.Schema.ObjectId,
		ref: 'user'
		required: true
	},
	date: {
		type: Date,
	}
	reaction: [{
		type: mongoose.Schema.ObjectId,
		ref: 'reaction'
	}]
});

var Page = mongoose.model('page', pageSchema);

module.exports = Page;