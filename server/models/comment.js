const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
	email:{
		type: String,
		required: true
	}
	content:{
		type: String,
		required: true
	},
	date: {
		type: Date
	},
	reaction:[{
		type: mongoose.Schema.ObjectId,
		ref: 'reaction'
	}],
	subComment:[{
		type: mongoose.Schema.ObjectId,
		ref: 'comment' //check might get ambigous: comment-> subComment -> subComment ...
	}]
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true
	}
});

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;