//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();

//LOADING MODELS
const Comment = require('../models/comment');
const Post = require('../models/post');

//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isCommentOwner;


/**********************************************************
                      ROUTES
**********************************************************/

//COMMENTING ON A POST
router.post('/:id', authenticate, (req, res) => {
  if (!req.body.content) {
    res.status(400)
      .send();
  }

  new Comment({
    content: req.body.content,
    owner: req.user._id
  }).save()
    .then((comment) => {
      console.log(comment);
      return Post.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: comment._id
        }
      });
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//REPLYING TO A COMMENT
router.post('/reply/:id', authenticate, (req, res) => {
  if (!req.body.content) {
    res.status(400)
      .send();
  }

  new Comment({
    content: req.body.content,
    owner: req.user._id
  }).save()
    .then((comment) => {
      return Comment.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: comment._id
        }
      });
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//FETCHING REPLYS OF A COMMENT
router.get('/reply/:id', authenticate, (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      return Comment.find({
        _id: {
          $in: comment.comments
        }
      });
    })
    .then(subComments => {
      res.status(200)
        .json(subComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//LIKING A COMMENT
router.get('/like/:id', authenticate, (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      if (comment.likes.indexOf(req.user._id) !== -1) {
        Comment.findByIdAndUpdate(req.params.id, {
          $pull: {
            likes: req.user._id
          }
        }).then(() => {
          res.status(200)
            .send();
        }).catch(err => {
          console.log(err);
          res.status(500)
            .json(err);
        });
      } else {
        Comment.findByIdAndUpdate(req.params.id, {
          $push: {
            likes: req.user._id
          }
        }).then(() => {
          res.status(200)
            .send();
        }).catch(err => {
          console.log(err);
          res.status(500)
            .json(err);
        });
      }
    });
});


//DELETING A COMMENT
router.delete('/:id', authenticate, isOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//EDITING A COMMENT
router.put('/:id', authenticate, isOwner, (req, res) => {
  if (!req.body.content) {
    res.status(400)
      .send();
  }
  Comment.findByIdAndUpdate(req.params.id, {
    content: req.body.content
  })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


module.exports = router;
