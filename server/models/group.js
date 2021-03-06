const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post');

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
	img: {
		type: String,
		required: true
	},
	owner : {
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

groupSchema.pre('remove', function(next) {
	Post.find({
		_id: {
			$in: this.posts
		}
	})
		.then((posts) => {
			posts.forEach(post => {
				post.remove();
			});
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

const Group = mongoose.model('group', groupSchema);

module.exports = Group;
