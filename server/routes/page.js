const User = require('../models/user');
const Page = require('../models/page');

const express = require('express');
const router = express.Router();

// getting all the pages
router.get('/',(req,res)=>{
    Page.find({})
    .limit(req.query.count)
    .then((pages)=>{
        res.status(200)
            .json(pages);
    })
    .catch((err)=>{
        res.status(404)
            .send();
        console.log("Error occured!");
    })
})

// request for getting  the list of all the pages maintained by user.
router.get('/my-pages',(req,res) => {//user pages
    // res.send("these are your pages");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.find({}).sort({date:-1})
        .limit(req.query.count)
    })
    .then((userPages)=>{
        res.status(200)            
            .json(userpages);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
})

// request for getting the page 
router.get('/:id',(req,res) => {
    // res.send("this is your page");
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.find({_id:req.params.id});
    })
    .then((page)=>{
        res.status(200)
            .json(page);
    })
    .catch((err)=>{
        res.status(404)
        .send();
        console.log(err);
    })
})

//LIKING A PAGE
router.get('/like/:id', (req, res) => {
    Page.findById(req.params.id)
      .then(page => {
        if (page.likes.includes(req.user._id)) {
          Page.findByIdAndUpdate(req.params.id, {
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
          Page.findByIdAndUpdate(req.params.id, {
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


// post requests

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
        res.status(404)
        .send();
        console.log(err);
    })
})

//delete request
//to remove a page with page id
router.delete('/:id',()=>{
    User.find({_id:req.user._id})
    .then((user)=>{
        user.pages.remove({_id:req.params.id});
    })
    .then(()=>{
        //removing from the database
        page.findByIdAndRemove(req.params.id);
    })
    .then(()=>{
        res.status(200)
        .send();
        console.log('Page removed successfully');
    })
    .catch((err)=>{
        console.log('Page not removed!');
        res.status(404)
        .json(err);
    })
});


// Update routes
router.put('/:id',(req,res)=>{
    let newPage = req.body;
    Page.findByIdAndUpdate(req.params.id,newPage)
    .then(()=>{
        res.status(200)
        .send();
        console.log('page details updated successfully');
    })
    .catch((err)=>{
        res.status(404)
        .json(err);
        console.log(err+" occured");
    })
})

module.exports = router; 
