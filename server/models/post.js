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
	reactions: [{
		type: mongoose.Schema.ObjectId,
		ref: 'reaction'
	}],
	comments: [{
		type: mongoose.Schame.ObjectId,
		ref: 'comment'
	}],
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'user'
		required: true
	}
	date: {
		type: Date,
		required: true
	}
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;