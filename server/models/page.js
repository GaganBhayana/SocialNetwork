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
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}]
});

var Page = mongoose.model('page', pageSchema);

module.exports = Page;
