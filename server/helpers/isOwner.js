//LOADING MODELS
const Post = require('../models/post');
const Comment = require('../models/comment');


/*******************************************************
                    MIDDLEWARE
*******************************************************/

module.exports.isPostOwner = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post && post.owner.equals(req.user._id)) {
        next();
      } else {
        res.status(400)
          .send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
};

module.exports.isCommentOwner = (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => {
      if (comment && comment.owner.equals(req.user._id)) {
        next();
      } else {
        res.status(400)
          .send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
};
