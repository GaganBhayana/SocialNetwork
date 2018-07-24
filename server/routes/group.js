//LOADING MODELS
const User = require('../models/user');
const Group = require('../models/group');
const Post = require('../models/post');


//LOADING DEPENDENCIES
const express = require('express');
const router = express.Router();


//LOADING MIDDLEWARES
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isGroupOwner;


/**************************************************
                    ROUTES
**************************************************/

//FETCHING ALL GROUPS
router.get('/', authenticate, (req, res) => {
    Group.find({})
      .limit(Number(req.query.count))
      .then((groups)=>{
          res.status(200)
            .json(groups);
      })
      .catch(err => {
          console.log(err);
          res.status(500)
            .send();
      });
});


//FETCHING GROUPS CREATED AND JOINED BY USER
router.get('/my-groups', authenticate, (req, res) => {
  let response = {};
  Group.find({
    owner: req.user._id
  })
    .sort({date:-1})
    .then(createdGroups => {
      response.createdGroups = createdGroups;
      return Group.find({
        $and: [
          {_id: {$in: req.user.groups}},
          {owner: {$ne: req.user._id}}
        ]
      })
      .sort({date: -1})
      .limit(Number(req.query.count));
    })
    .then(joinedGroups => {
      response.joinedGroups = joinedGroups;
      res.status(200)
        .json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING GROUP SUGGESTIONS FOR THE USER
router.get('/suggestions', (req, res) => {
  let suggestedGroups = [];
  User.find({
    _id: {
      $in: req.user.friends
    }
  })
    .then(friends => {
      friends.forEach(friend => {
        suggestedGroups = suggestedGroups.concat(friend.groups);
      });
      return Group.find({
        _id: {
          $in: suggestedGroups
        }
      })
        .limit(Number(req.query.count));
    })
    .then(groups => {
      res.status(200)
        .json(groups);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//FETCHING DETAILS OF A GROUP
router.get('/:id', authenticate, (req,res) => {
  let response = {};
  Group.findById(req.params.id)
    .then(group => {
      response = group._doc;
      response.joined = !(group.members.indexOf(req.user._id) === -1);
      res.status(200)
        .json(response);
    })
    .catch(err => {
      res.status(500)
        .send();
    });
});


//FETCHING MEMBERS OF A GROUP
router.get('/members/:id', (req, res) => {
  Group.findById(req.params.id)
    .then(group => {
      return User.find({
        _id: {
          $in: group.members
        }
      });
    })
    .then(members => {
      res.status(200)
        .json(members);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .send();
    });
});


//CREATING A NEW GROUP
router.post('/', authenticate, (req, res) => {
    if (!req.body.title) {
      res.status(400)
        .send();
    }

    new Group({
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      owner: req.user._id,
    })
      .save()
      .then(group => {
          return Group.findByIdAndUpdate(group._id, {
            $push: {
              members: req.user._id
            }
          });
      })
      .then(group => {
        return req.user.update({
            $push: {
                groups: group._id
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


//DELETING A GROUP BY ID
router.delete('/:id', authenticate, isOwner, (req, res) => {
  let groupToBeDelted = null;
  Group.findById(req.params.id)
    .then(group => {
      groupToBeDeleted = group;
      return User.update({
        _id: {
          $in: groupToBeDeleted.members
        }
      }, {
        $pull: {
          groups: groupToBeDeleted._id
        }
      }, {
        multi: true
      });
    })
    .then(() => {
      return groupToBeDeleted.remove();
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


//UPDATING GROUP DETAILS
router.put('/:id', authenticate, isOwner, (req, res) => {
    Group.findByIdAndUpdate(req.params.id,req.body)
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

//JOINING A GROUP
router.put('/join/:id', authenticate, (req, res) => {
    let groupId = null;
    Group.findById(req.params.id)
      .then(group => {
        groupId = group._id;
        return group.update({
          $push:{
            members: req.user._id
          }
        });
      })
      .then(() => {
        return req.user.update({
          $push: {
            groups: groupId
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
          .send(err);
      });
});


//LEAVING A GROUP
router.put('/leave/:id', authenticate, (req, res) => {
  let groupId = null;
    Group.findById(req.params.id)
    .then(group => {
      groupId = group._id;
      return group.update({
        $pull: {
          members: req.user._id
        }
      });
    })
    .then(() => {
      return req.user.update({
        $pull: {
          groups: groupId
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

module.exports = router;
