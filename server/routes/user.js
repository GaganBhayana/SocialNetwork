const User = require('../models/user');
const Comment = require('../models/comment');
const Group = require('../models/group');
const Page = require('../models/page');
const Post = require('../models/page');
const Notification = require('../models/notification');

const express = require('express');
const router = express.Router();

const fixed = 10;


// get Requests--------------------------------
router.get('/',(req,res)=>{// dashboard
        res.send("Welcome user!"); 
})

router.get('/:id',(req,res) => {//profile of a user
    // res.send("this is the user"+req.params.id);
    User.find({_id:req.params.id})
    .then((user)=>{
        user.posts.find({})
        .limit(fixed)
    })
    .then((userPosts)=>{
        res.json(JSON.stringify(userPosts));
    })
    .catch((err)=>{
        console.log(err);
    })
}) 

router.get('/:id/pages',(req,res) => {//user pages
    // res.send("these are your pages");
    User.find({_id:req.params.id})
    .then((user)=>{
        user.pages.find({})
        .limit(fixed)
    })
    .then((userPages)=>{
            res.json(JSON.stringify(userpages));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/:user_id/page/:page_id',(req,res) => {
    // res.send("this is your page");
    User.find({_id:req.params.user_id})
    .then((user)=>{
        user.pages.find({_id:req.params.page_id});
    })
    .then((page)=>{
        res.json(JSON.stringify(page));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/:id/posts',(req,res) => {
    // res.send("these are your posts");
    User.find({_id:req.params.id})
    .then((user)=>{
        user.posts.find({})
        .limit(fixed);
    })
    .then((posts)=>{
        res.json(JSON.stringify(posts));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/:id/friends',(req,res) => {
    // res.send("these are your friends");
    User.find({_id:req.params.id})
    .then((user)=>{
        user.friends.find({})
        .limit(2*fixed);
    })
    .then((friends)=>{
        res.json(JSON.stringify(friends));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/:id/groups',(req,res) => {
    // res.send("these are your groups");
    User.find({_id:req.params.id})
    .then((user)=>{
        user.groups.find({})
        .limit(fixed);
    })
    .then((groups)=>{
        res.json(JSON.stringify(groups));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/:user_id/group/:group_id',(req,res) => {
    // res.send("this is your group");
    User.find({_id:req.params.user_id})
    .then((user)=>{
        user.groups.find({_id:req.params.group_id})
    })
    .then((group)=>{
        res.json(JSON.stringify(group));
    })
    .catch((err)=>{
        console.log(err);
    })
})

// post requets -------------------------------------------

//  update requests---------------------------------------
module.exports = router;