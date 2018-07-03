const User = require('../models/user');
const Page = require('../models/page');

const express = require('express');
const router = express.Router();

// loading middleware
const authenticate = require('../helpers/authenticate');
const isOwner = require('../helpers/isOwner').isPageOwner;



// getting all the pages
router.get('/',(req,res)=>{
    Page.find({})
    .limit(Number(req.query.count))
    .then((pages)=>{
        res.status(200)
            .json(pages);
    })
    .catch((err)=>{
        console.log("Error occured!");
        res.status(404)
            .send();
    })
})

// request for getting  the list of all the pages maintained by user.
router.get('/my-pages',authenticate,(req,res) => {//user pages
    Page.find({owner:req.user._id})
    .limit(Number(req.query.count))
    .sort({date:-1})
    .then((userPages)=>{
        res.status(200)            
            .json(userpages);
    })
    .catch((err)=>{
        console.log(err);
        res.status(404)
        .send();
    })
})

// request for getting the page 
router.get('/:id',authenticate,(req,res) => {
    // res.send("this is your page");

    Page.find({owner: req.user._id})
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
router.get('/like/:id',authenticate, (req, res) => {
    Page.findById(req.params.id)
      .then(page => {
          // if like a;ready exists
        if (page.likes.indexOf(req.user._id) !== -1) {
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
router.post('/',authenticate,()=>{
    var page = {
        title: req.body.title,
        description: req.body.content,
        owner: req.user._id,
        date: req.body.date
    }
    new Page(page)
    .save()
    .then(page => {
        req.user.update({
            $push: {
                pages: page._id
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

//delete request

//to remove a page with page id
router.delete('/:id',authenticate,isOwner,(req,res)=>{
    Page.findById(req.params.id)
    .then((page) => {
      return page.remove();
    })
    .then((page) => {
      req.user.update({
        $pull:{
          pages: page._id
        }
      })
      res.status(200)
        .send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(err);
    });
});


// Update routes
router.put('/:id',authenticate,isOwner,(req,res)=>{
    let newPage = req.body;
    Page.findByIdAndUpdate(req.params.id,newPage)
    .then(()=>{
        console.log('page details updated successfully');
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
