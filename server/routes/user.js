const User = require('../models/user');
const Comment = require('../models/comment');
const Group = require('../models/group');
const Page = require('../models/page');
const Post = require('../models/page');
const Notification = require('../models/notification');

const express = require('express');
var querystring = require('querystring');
const router = express.Router();

const fixed = 10;


// get Requests--------------------------------
router.get('/',(req,res)=>{// dashboard
    User.find({_id:req.user._id})
    .then((user)=>{
        // user.friends
    }) 
})

router.get('/:id',(req,res) => {//profile of a user
    // res.send("this is the user"+req.params.id);
    User.find({_id:req.params.id})
    .then((user)=>{
        user.posts.find({}).sort({date:-1})
        .limit(req.param('counter'))
    })
    .then((userPosts)=>{
        res.json(JSON.stringify(userPosts));
    })
    .catch((err)=>{
        console.log(err);
    })
}) 

router.get('/pages',(req,res) => {//user pages
    // res.send("these are your pages");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.find({}).sort({date:-1})
        .limit(req.param('counter'))
    })
    .then((userPages)=>{
            res.json(JSON.stringify(userpages));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/page/:page_id',(req,res) => {
    // res.send("this is your page");
    User.find({_id:req.user._id})
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

router.get('/posts',(req,res) => {
    // res.send("these are your posts");
    User.find({_id:req.user.id})
    .then((user)=>{
        user.posts.find({}).sort({date:-1})
        .limit(req.param('counter'));
    })
    .then((posts)=>{
        res.json(JSON.stringify(posts));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/friends',(req,res) => {
    // res.send("these are your friends");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.friends.find({})
        .limit(req.param('counter'));
    })
    .then((friends)=>{
        res.json(JSON.stringify(friends));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/groups',(req,res) => {
    // res.send("these are your groups");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.find({}).sort({date:1})
        .limit(req.param('counter'));
    })
    .then((groups)=>{
        res.json(JSON.stringify(groups));
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/group/:group_id',(req,res) => {
    // res.send("this is your group");
    User.find({_id:req.user._id})
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
router.post('/',(req,res)=>{// registereing a new user
    var user= {
        email: req.body.email,
        name: req.body.name,
        tagLine: (req.body.tagLine)?req.body.tagLine:"",
        img: " ",
        role: req.body.role,
        gender: req.body.gender,
        dob: req.body.dob,
        location: req.body.location ? req.body.location :"",
        school: req.body.school ? req.body.school: ""
    }  
    User.insert({
        email:user.email, 
        name:user.name, 
        tagLine:user.tagLine,
        role: user.role,
        gender: user.gender,
        dob: user.dob,
        location: user.location,
        school: user.school
    })
    .then(()=>{
        consols.log("User added successfully");
    })
    .catch((err)=>{
        console.log('error occured: '+err);
    })
})

router.post('/posts',(req,res)=>{
    var post = {
        title: req.body.title,
        content: req.body.content,
        img: "",
        owner: req.params.id,
        date: req.body.date
    }
    User.find({_id:req.user._id})
    .then((user)=>{
        user.insert({
            title: user.title,
            content: user.content,
            img: user.img,
            owner: user.owner,
            date: user.date
        })
    })
    .then(()=>{
        console.log('Post added successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.post('/pages',()=>{
    var page = {
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
        console.log('page added successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
})

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
        console.log("Group added successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
})

// delete requests
// thought: put the deleted user in temp database which can be recovered within 30 days if needed
router.delete('/',()=>{
    User.remove({_id:req.user._id})
    .then((user)=>{
        console.log("User removed successfully!");
    })
    .catch((err)=>{
       console.log("User not removed!"); 
    })
})

//***************** Also write code to remove from the collection of post,page and group */
router.delete('/post/:post_id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.posts.remove({_id:req.params.post_id});
    })
    .then(()=>{
        console.log('Post removed successfully');
    })
    .catch((err)=>{
        console.log('Post not removed1');
    })
});

router.delete('/page/:page_id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.remove({_id:req.params.page_id});
    })
    .then(()=>{
        console.log('Page removed successfully');
    })
    .catch((err)=>{
        console.log('Page not removed!');
    })
});

router.delete('/group/:group_id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.remove({_id:req.params.group_id});
    })
    .then(()=>{
        console.log('Group removed successfully');
    })
    .catch((err)=>{
        console.log('Group not removed!');
    });
});

//  update requests---------------------------------------

module.exports = router;