//LOADING DEPENDENCIES
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//LOADING CONFIG
require('./server/config/config');


//INITIALIZING APP
const app = express();


//SETTING MIDDLEWARES
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));


//MIDDLEWARE FOR CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//CONNECTING TO THE DATABASE
require('./server/config/mongoose');


//CHECKING nodemailer
require('./server/config/nodemailer');


//LOADING HELPERS
const emailVerification = require('./server/helpers/emailVerification');


//LOADING MODELS
const User = require('./server/models/user');



/***********************************
                Routes
***********************************/


//SIGNUP ROUTE
app.post('/sign-up', (req, res) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        newUser.password = hash;
        emailVerification.sendVerificationMail(req, res, newUser);
      }
    });
  });
});


//CONFIRM EMAIL ROUTE
app.get('/confirm-email/:url', (req, res) => {
  let verificationUrl = req.params.url;
  emailVerification.confirmEmail(req, res, verificationUrl);
});


//LOGIN ROUTE
app.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (!user) {
      res.status(400)
        .json({
          success: false,
          message: 'User not found'
        });
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          res.status(400)
            .json({
              success: false,
              message: "Email and Password doesn't match"
            });
        } else {
          const payload = {
            id: user._id,
          };
          var token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200)
            .json({
              success: true,
              message: 'Successfully logged in',
              token,
            });
        }
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send();
  });
});



//SENDING POST BUILD
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


//STARTING SERVER
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
