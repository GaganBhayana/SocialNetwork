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

//profile of a user - anyone logged in can see it
router.get('/:id',(req,res) => {
    // res.send("this is the user"+req.params.id);
    User.find({_id:req.params.id})
    .then((user)=>{
        user.posts.find({}).sort({date:-1})
        .limit(req.param('counter'))
    })
    .then((userPosts)=>{
        res.status(200)
            .json(JSON.stringify(userPosts));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
}) 

// request for getting  the list of all the pages maintained by user.
router.get('/pages',(req,res) => {//user pages
    // res.send("these are your pages");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.find({}).sort({date:-1})
        .limit(req.param('counter'))
    })
    .then((userPages)=>{
        res.status(200)            
            .json(JSON.stringify(userpages));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// request for getting the page 
router.get('/page/:page_id',(req,res) => {
    // res.send("this is your page");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.find({_id:req.params.page_id});
    })
    .then((page)=>{
        res.status(200)
            .json(JSON.stringify(page));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// request for getting all the posts (profile page)
router.get('/posts',(req,res) => {
    // res.send("these are your posts");
    User.find({_id:req.user.id})
    .then((user)=>{
        user.posts.find({}).sort({date:-1})
        .limit(req.param('counter'));
    })
    .then((posts)=>{
        res.status(200)
            .json(JSON.stringify(posts));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// request for getting the list of all friends
router.get('/friends',(req,res) => {
    // res.send("these are your friends");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.friends.find({})
        .limit(req.param('counter'));
    })
    .then((friends)=>{
        res.status(200)
            .json(JSON.stringify(friends));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// request for getting a list of all the groups
router.get('/groups',(req,res) => {
    // res.send("these are your groups");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.find({}).sort({date:1})
        .limit(req.param('counter'));
    })
    .then((groups)=>{
        res.status(200)
            .json(JSON.stringify(groups));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// Request for getting the group main page
router.get('/group/:group_id',(req,res) => {
    // res.send("this is your group");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.find({_id:req.params.group_id})
    })
    .then((group)=>{
        res.status(200)
            .json(JSON.stringify(group));
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// post requets -------------------------------------------
// registereing a new user
router.post('/',(req,res)=>{
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
        res.status(200);
        consols.log("User added successfully");
    })
    .catch((err)=>{
        res.status(404);
        console.log('error occured: '+err);
    })
})

// making a new post
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
        res.status(200);
        console.log('Post added successfully');
    })
    .catch((err)=>{
        res.status(404);
        console.log(err);
    })
})

// making a new page
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
        res.status(200);
        console.log('page added successfully');
    })
    .catch((err)=>{
        res.status(404);
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
        res.status(404);
        console.log(err);
    })
})

// delete requests
// thought: put the deleted user in temp database which can be recovered within 30 days if needed
// removing the user 
router.delete('/',()=>{
    User.remove({_id:req.user._id})
    .then((user)=>{
        res.status(200);
        console.log("User removed successfully!");
    })
    .catch((err)=>{
        res.status(404);
       console.log("User not removed!"); 
    })
})

//***************** Also write code to remove from the collection of post,page and group */
// to remove a post with post id
router.delete('/post/:post_id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.posts.remove({_id:req.params.post_id});
    })
    .then(()=>{
        res.status(200);
        console.log('Post removed successfully');
    })
    .catch((err)=>{
        res.status(404);
        console.log('Post not removed1');
    })
});

//to remove a page with page id
router.delete('/page/:page_id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.remove({_id:req.params.page_id});
    })
    .then(()=>{
        res.status(200);
        console.log('Page removed successfully');
    })
    .catch((err)=>{
        res.status(404);
        console.log('Page not removed!');
    })
});

//to remove a group with group id
router.delete('/group/:group_id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.groups.remove({_id:req.params.group_id});
    })
    .then(()=>{
        res.status(200);
        console.log('Group removed successfully');
    })
    .catch((err)=>{
        res.status(404);
        console.log('Group not removed!');
    });
});

//  update requests---------------------------------------
// updating user details
router.put('/',(req,res)=>{
    let newUser = req.body;
    User.findByIdAndUpdate(req.user._id,newUser)
    .then(()=>{
        res.status(200);
        console.log('User details updated successfully!')
    })  
    .catch((err)=>{
        res.status(404);
        console.log(err+" occured");
    })
})

// updating group details
router.put('/group/:id',(req,res)=>{
    let newGroup = req.body;
    Group.findByIdAndUpdate(req.params.id,newGroup)
    .then(()=>{
        res.status(200);
        console.log('Group details updated successfully');
    })
    .catch((err)=>{
        res.status(404);
        console.log(err+" occured");
    })
})

//updating page details
router.put('/page/:id',(req,res)=>{
    let newPage = req.body;
    Group.findByIdAndUpdate(req.params.id,newPage)
    .then(()=>{
        res.status(200);
        console.log('page details updated successfully');
    })
    .catch((err)=>{
        res.status(404);
        console.log(err+" occured");
    })
})

module.exports = router;