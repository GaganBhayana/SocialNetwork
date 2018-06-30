//LOADING MODELS
const Comment = require('../models/comment');
const Post = require('../models/post');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');


//MOUNTING COMMENT ROUTE
const comment = require('./comment');
router.use('/comment', comment);



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
<<<<<<< HEAD
router.delete('/:id', authenticate, (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200)
=======
router.delete('/:id', (req, res) => {
  User.find({_id:req.user._id})
    .then((user)=>{
        user.posts.remove({_id:req.params.post_id});
    })
    .then(()=>{
      //removing from post database
      post.findByIdAndRemove(req.params.id)
    })
    .then(()=>{
        res.status(200)
>>>>>>> 01d61aed2ec820ba0b96e2526baed8e8384f66ed
        .send();
        console.log('Post removed successfully');
    })
    .catch((err)=>{
        res.status(404)
        .json(err);
        console.log('Post not removed1');
    })
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

module.exports = router;
