//LOADING MODELS
const User = require('../models/user');
const Comment = require('../models/comment');
const Group = require('../models/group');
const Page = require('../models/page');
const Post = require('../models/post');
const Notification = require('../models/notification');


//LOADING MODELS
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');


/**********************************************************
                      ROUTES
**********************************************************/

//FETCHING ALL POSTS OF A USER
router.get('/', authenticate, (req, res) => {
  const count = req.query.count;

  let friends = req.user.friends;
  friends.push(req.user._id);

  Post.find({
    owner: {
      $in: friends
    }
  }).sort({
      date: -1
    })
    .limit(count)
    .then(posts => {
      res.status(200)
        .json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//FETCHING POSTS POSTED BY USER
router.get('/my-posts', authenticate, (req, res) => {
  const count = req.query.count;

  Post.find({
    owner: req.user._id
  }).sort({
    date: -1
  })
    .limit(count)
    .then(posts => {
      res.status(200)
        .json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//FETCHING A PARTICULAR POST
router.get('/:id', authenticate, (req, res) => {
  let post = {};

  Post.findById(req.params.id)
    .then(fetchedPost => {
      post = fetchedPost;
      return Comment.find({
        _id: {
          $in: fetchedPost.comments
        }
      });
    })
    .then(comments => {
      post.comments = comments;
      res.status(200)
        .json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//LIKING A POST
router.get('/like/:id', authenticate, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.likes.indexOf(req.user._id) !== -1) {
        Post.findByIdAndUpdate(req.params.id, {
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
        Post.findByIdAndUpdate(req.params.id, {
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


//POSTING A POST
router.post('/', authenticate, (req, res) => {
  if (!req.body.title) {
    res.status(400)
      .send();
  }

  let post = {};
  post.title = req.body.title;
  post.content = req.body.content;
  post.img = req.body.img;
  post.owner = req.user._id;

  new Post(post)
    .save()
    .then(post => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json(err);
    })
});


//DELETING A POST
router.delete('/:id', authenticate, (req, res) => {
  Post.findByIdAndRemove(req.params.id)
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


//UPDATING A POST
router.put('/:id', authenticate, (req, res) => {
  let post = req.body;
  Post.findByIdAndUpdate(req.params.id, post)
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


//COMMENTING ON A POST
router.post('/comment/:id', authenticate, (req, res) => {
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
router.post('/comment/reply/:id', authenticate, (req, res) => {
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
router.get('/comment/reply/:id', authenticate, (req, res) => {
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
router.get('/comment/like/:id', authenticate, (req, res) => {
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
router.delete('/comment/:id', authenticate, (req, res) => {
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
router.put('/comment/:id', authenticate, (req, res) => {
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
