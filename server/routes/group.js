const User = require('../models/user');
const Group = require('../models/group');

const express = require('express');
const router = express.Router();

//loading middlewares
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isGroupOwner;

// getting all the groups
router.get('/',(req,res)=>{
    Group.find({})
    .limit(Number(req.query.count))
    .then((groups)=>{
        res.status(200)
            .json(groups);
    })
    .catch((err)=>{
        console.log("Error occured!");
        res.status(404)
        .send();
    })
})

// request for getting a list of all the groups
router.get('/my-groups',authenticate,(req,res) => {

    Group.find({owner: req.user._id})
    .sort({date:-1})
    .limit(Number(req.query.count))
    .then((groups)=>{
        res.status(200)
            .json(groups);
    })
    .catch((err)=>{
        console.log(err);
        res.status(404)
        .send();
    })
})


// Request for getting the group main page
router.get('/:group_id',(req,res) => {

    Group.find({_id: req.params.id})
    .then((group)=>{
        res.status(200)
            .json(group);
    })
    .catch((err)=>{
        console.log(err);
        res.status(404)
        .send();
    })
})

// making a new group
router.post('/',authenticate,(req,res)=>{
    var group = {
        title: req.body.title,
        description: req.body.content,
        owner: req.params.id,
        date: req.body.date
    }
    new Group(group)
    .save()
    .then(group => {
        req.user.update({
            $push: {
                groups: group._id
            }
        })
        res.status(200)
        .send();
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json(err);
    })
})

// delete routes
//to remove a group with group id
router.delete('/:id',authenticate,isOwner,(req,res)=>{

    Group.remove({_id:req.params.id})
    .then((group)=>{
        req.user.update({
            $pull: {
                groups: group._id
            }
        })
    })
    .then(()=>{
        console.log('Group removed successfully');
        res.status(200)
        .send();
    })
    .catch((err)=>{
        console.log('Group not removed!');
        res.status(404)
        .json(err);
    });
});

// Update routes

// updating group details
router.put('/:id',authenticate,isOwner,(req,res)=>{
    let newGroup = req.body;
    Group.findByIdAndUpdate(req.params.id,newGroup)
    .then(()=>{
        console.log('Group details updated successfully');
        res.status(200)
        .send();
    })
    .catch((err)=>{
        console.log(err+" occured");
        res.status(404)
        .json(err);
    })
})

module.exports = router;
 