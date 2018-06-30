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
        .limit(req.query.count)
    })
    .then((userPosts)=>{
        res.status(200)
            .json(userPosts);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
}) 

// request for getting all the posts (profile page)
router.get('/posts',(req,res) => {
    // res.send("these are your posts");
    User.find({_id:req.user.id})
    .then((user)=>{
        user.posts.find({}).sort({date:-1})
        .limit(req.query.count);
    })
    .then((posts)=>{
        res.status(200)
            .json(posts);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
})

// request for getting the list of all friends
router.get('/friends',(req,res) => {
    // res.send("these are your friends");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.friends.find({})
        .limit(req.query.count);
    })
    .then((friends)=>{
        res.status(200)
            .json(friends);
    })
    .catch((err)=>{
        res.status(404)
        .send();
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
        res.status(404)
        .send();
        console.log('error occured: '+err);
    })
})

// making a new post
// router.post('/posts',(req,res)=>{
//     var post = {
//         title: req.body.title,
//         content: req.body.content,
//         img: "",
//         owner: req.params.id,
//         date: req.body.date
//     }
//     User.find({_id:req.user._id})
//     .then((user)=>{
//         user.insert({
//             title: user.title,
//             content: user.content,
//             img: user.img,
//             owner: user.owner,
//             date: user.date
//         })
//     })
//     .then(()=>{
//         res.status(200);
//         console.log('Post added successfully');
//     })
//     .catch((err)=>{
//         res.status(404)
//         .send();
//         console.log(err);
//     })
// })

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
        res.status(404)
        .send();
       console.log("User not removed!"); 
    })
})

//***************** Also write code to remove from the collection of post,page and group */

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
        res.status(404)
        .send();
        console.log(err+" occured");
    })
})




module.exports = router;