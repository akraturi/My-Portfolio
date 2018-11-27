const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');

// modify the source file for this lol!
// ejs.open = '{{'
// ejs.close = '}}'

var app = express();
app.set('view engine','ejs')
// to grab the data out of post requests
app.use(bodyParser.urlencoded({extended: true}))
// path to static files
app.use(express.static('public'))
// get or create the database
mongoose.connect("mongodb://localhost/my_blog",{ useNewUrlParser: true })

app.get('/',function(req,res){
    res.render('index',{})
});

app.get('/about',function(req,res){
    res.send("Hi there!")
});


app.listen(8000,function(){
  console.log("Server running at port 8000");
})
