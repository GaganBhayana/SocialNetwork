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
	},
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	followers: [{
		type:  mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	date: {
		type: Date,
		default: Date.now()
	}
});

var Page = mongoose.model('page', pageSchema);

module.exports = Page;
