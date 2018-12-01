const express = require('express');
const path = require('path');
const router = require('./routes');

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejs = require('ejs');
const seedDB  = require('./seeds');
const Profile  = require('./models/portfoliomodels');
// modify the source file for this lol!
// ejs.open = '{{'
// ejs.close = '}}'

var app = express();
// setup imported router
app.use(router)
// setup root view path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

// path to static files
app.use(express.static('public'))
// get or create the database
mongoose.connect("mongodb://localhost/my_portfolio",{ useNewUrlParser: true })

// seed the db with initial data whenever the server starts
// seedDB();

// Profile.findOne(function(err,profile){
//   if (err) {
//     console.log("error");
//   }else {
//     console.log("sucess");
//     console.log("from main server");
//     console.log(profile);
//   }
//   app.locals.profile = profile;
// })

app.listen(8080,function(){
  console.log("Server running at port 8080");
});
