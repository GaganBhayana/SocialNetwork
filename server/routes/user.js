const User = require('../models/user');
const Comment = require('../models/comment');
const Group = require('../models/group');
const Page = require('../models/page');
const Post = require('../models/page');
const Notification = require('../models/notification');

const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
        res.send("Welcome user!"); 
})
router.get('/:id',(req,res) => {
   
    res.send("this is the user"+req.params.id);

})
router.get('/pages',(req,res) => {
    
    res.send("these are your pages");
})
router.get('/page/:id',(req,res) => {
    res.send("this is your page");
})
router.get('/posts',(req,res) => {
    res.send("these are your posts");
})
router.get('/friends',(req,res) => {
    res.send("these are your friends");
    
})

router.get('/groups',(req,res) => {
    res.send("these are your groups");
})

router.get('/group/:id',(req,res) => {
    res.send("this is your group");
})
module.exports = router;