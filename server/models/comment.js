const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
	content:{
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: new Date().now()
	},
	likes:[{
		type: mongoose.Schema.ObjectId,
		ref: 'user'
	}],
	comments:[{
		type: mongoose.Schema.ObjectId,
		ref: 'comment'
	}]
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true
	}
});

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
