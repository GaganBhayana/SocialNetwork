const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String
	},
	img: {
		type: String
	},
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	comments: [{
		type: mongoose.Schema.ObjectId,
		ref: 'comment'
	}],
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: true
	},
	date: {
		type: Date,
		default: new Date()
	}
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
