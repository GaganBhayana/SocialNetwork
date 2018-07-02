//LOADING MODELS
const User = require('../models/user');
const Comment = require('../models/comment');
const Group = require('../models/group');
const Page = require('../models/page');
const Post = require('../models/page');
const Notification = require('../models/notification');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();
const authenticate = require('../helpers/authenticate');

/***********************************************************
                        ROUTES
***********************************************************/

//FETCHING DETAILS OF A USER
router.get('/', authenticate, (req, res) => {
  let id = null;
  let response;
  if (!req.query.id) {
    res.status(200)
      .json(req.user);
  } else {
    id = req.query.id;
  }

  User.findById(id)
    .then(user => {
      response = {...user._doc};
      response.isFriend = user.friends.some(friend => friend.equals(req.user._id));
      response.friendRequestSent = user.friendRequests.some(request => request.equals(req.user._id));
      res.status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING FRIEND LIST
router.get('/friends', authenticate, (req, res) => {
  let id = null;

  if (req.query.id) {
    id = req.query.id;
  } else {
    id = req.user._id;
  }

  User.findById(id)
    .then(user => {
      return User.find({
        _id: {
          $in: user.friends
        }
      });
    })
    .then(friends => {
      res.status(200)
        .json(friends);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    })
});


//FETCHING FRIEND REQUESTS
router.get('/friend-requests', authenticate, (req, res) => {
  User.find({
    _id: {
      $in: req.user.friendRequests
    }
  })
    .then(friendRequests => {
      res.status(200)
        .json(friendRequests);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//SENDING FRIEND REQUEST
router.put('/friend-request/send/:id', authenticate, (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    $push: {
      friendRequests: req.user._id
    }
  })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//ACCEPTING FRIEND REQUEST
router.put('/friend-request/accept/:id', authenticate, (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $pull: {
      friendRequests: req.params.id
    },
    $push: {
      friends: req.params.id
    }
  })
    .then(() => {
      return User.findByIdAndUpdate(req.params.id, {
        $push: {
          friends: req.user._id
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
        .send();
    });
});


//UPDATING USER PROFILE
router.put('/', authenticate, (req, res) => {
  delete req.body.email;
  delete req.body.password;

  User.findByIdAndUpdate(req.user._id, req.body)
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//DELETING A FRIEND REQEST
router.delete('/friend-request/:id', authenticate, (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $pull: {
      friendRequests: req.params.id
    }
  })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//DELETING A FRIEND
router.delete('/friend/:id', authenticate, (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $pull: {
      friends: req.params.id
    }
  })
    .then(() => {
      return User.findByIdAndUpdate(req.params.id, {
        $pull: {
          friends: req.user._id
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
        .send();
    });
});


//DELETING USER PROFILE
// TODO: ADD THE DELETED USER IN A DELETED USER MODEL SO THAT THE ACCOUNT
//CAN BE RECOVERED WITHIN 30 DAYS.
router.delete('/', authenticate, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      user.remove();
    })
    .then(() => {
      res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send()
    });
});


module.exports = router;
