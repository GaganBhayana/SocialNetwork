//LOADING MODELS
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isPostOwner;


//MOUNTING COMMENT ROUTE
const comment = require('./comment');
router.use('/comment', comment);



/**********************************************************
                      ROUTES
**********************************************************/

//FETCHING ALL POSTS FOR A USER
router.get('/', authenticate, (req, res) => {
  let friends = req.user.friends;
  friends.push(req.user._id);

  let query = {};

  if (req.query.parent) {
    query = {
      parent: req.query.parent
    }
  } else {
    query = {
      $or: [
        {
          $and:[
            {owner: {$in: friends}},
            {role: 'normal'}
          ]
        },
        {parent: {$in: req.user.pages}},
        {parent: {$in: req.user.groups}}
      ]
    }
  }

  Post.find(query)
    .sort({
      date: -1
    })
    .limit(Number(req.query.count))
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
  Post.find({
    owner: req.user._id
  }).sort({
    date: -1
  })
    .limit(Number(req.query.count))
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
  post.role = req.query.role || 'normal';
  post.parent = req.query.parent;

  let savedPost = null;

  new Post(post)
    .save()
    .then((post) => {
      savedPost = post;
      return User.findByIdAndUpdate(req.user._id, {
        $push: {
          posts: post._id
        }
      });
    })
    .then(() => {
      if (role === 'group') {
        Group.findByIdAndUpdate(req.query.parent, {
          $push: {
            posts: savedPost._id
          }
        });
      } else {
        Page.findByIdAndUpdate(req.query.parent, {
          $push: {
            posts: savedPost._id
          }
        });
      }
    })
    .then(() => {
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
router.delete('/:id', authenticate, isOwner, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      return post.remove();
    })
    .then((post) => {
      req.user.update({
        $pull:{
          posts: post._id
        }
      })
      res.status(200)
        .send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


//UPDATING A POST
router.put('/:id', authenticate, isOwner, (req, res) => {
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

module.exports = router;
