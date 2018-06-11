//LOADING DEPENDENCIES
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');


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
