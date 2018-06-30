const User = require('../models/user');
const Page = require('../models/page');

const express = require('express');
const router = express.Router();

// getting all the groups
router.get('/',(req,res)=>{
    Group.find({})
    .limit(req.query.count)
    .then((groups)=>{
        res.status(200)
            .json(groups);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log("Error occured!");
    })
})

// request for getting a list of all the groups
router.get('/my-groups',(req,res) => {
    // res.send("these are your groups");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.find({}).sort({date:1})
        .limit(req.query.count);
    })
    .then((groups)=>{
        res.status(200)
            .json(groups);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
})


// Request for getting the group main page
router.get('/:group_id',(req,res) => {
    // res.send("this is your group");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.find({_id:req.params.group_id})
    })
    .then((group)=>{
        res.status(200)
            .json(group);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
})

// making a new group
router.post('/groups',()=>{
    var group = {
        title: req.body.title,
        description: req.body.content,
        owner: req.params.id,
        date: req.body.date
    }
    User.find({_id:req.user._id})
    .then((user)=>{
        user.insert({
            title: user.title,
            description: user.description,
            owner: user.owner,
            date: user.date
        })
    })
    .then(()=>{
        res.status(200);
        console.log("Group added successfully");
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
})

// delete routes
//to remove a group with group id
router.delete('/:id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.remove({_id:req.params.id});
    })
    .then(()=>{
        //removing from the database
        Group.findByIdAndRemove(req.params.id);
    })
    .then(()=>{
        res.status(200)
        .send();
        console.log('Group removed successfully');
    })
    .catch((err)=>{
        res.status(404)
        .json(err);
        console.log('Group not removed!');
    });
});

// Update routes

// updating group details
router.put('/:id',(req,res)=>{
    let newGroup = req.body;
    Group.findByIdAndUpdate(req.params.id,newGroup)
    .then(()=>{
        res.status(200)
        .send();
        console.log('Group details updated successfully');
    })
    .catch((err)=>{
        res.status(404)
        .json(err);
        console.log(err+" occured");
    })
})

module.exports = router;
 