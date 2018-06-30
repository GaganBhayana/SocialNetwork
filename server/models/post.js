const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

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

postSchema.pre('remove', function(next) {
	Comment.find({
		_id: {
			$in: this.comments
		}
	}).then((comments) => {
			comments.forEach(comment => {
				comment.remove();
			});
			next();
	}).catch(err => {
			console.log(err);
		});
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
