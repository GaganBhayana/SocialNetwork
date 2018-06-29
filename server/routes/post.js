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


/**********************************************************
                      ROUTES
**********************************************************/

//FETCHING ALL POSTS OF A USER
router.get('/', (req, res) => {
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
router.get('/my-posts', (req, res) => {
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
router.get('/:id', (req, res) => {
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
      post.comments.forEach((comment, index) => {
        Comment.find({
          _id: {
            $in: comment.comments
          }
        })
        .then(subComments => {
          post.comments[index].comments = subComments;
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200)
        .json(post);
    });
});


//LIKING A POST
router.get('/like/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.likes.includes(req.user._id)) {
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
router.post('/', (req, res) => {
  if (!req.body.title) {
    res.status(400)
      .send();
  }

  let post = {};
  post.title = req.body.title;
  post.content = req.body.content;
  post.img = req.body.img;
  post.owner = '5b1e97216e968d4fecb4f0da';

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
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
  let post = req.body;
  findByIdAndUpdate(req.params.id, post)
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
router.post('/comment/:id', (req, res) => {
  if (!req.body.content) {
    res.status(400)
      .send();
  }

  new Comment({
    content: req.body.content,
    owner: req.user._id
  }).save()
    .then((comment) => {
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
router.post('/comment/reply/:id', (req, res) => {
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


//DELETING A COMMENT
router.delete('/comment/:id', (req, res) => {
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
router.put('/comment/:id', (req, res) => {
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
