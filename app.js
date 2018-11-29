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

app.get('/header/new',function(req,res){
    res.render('forms/resume_header',{});
});

app.get('/about/new',function(req,res){
     res.render('forms/about_me',{});
});

app.get('/skills/new',function(req,res){
     res.render('forms/skills',{});
});

app.get('/other_skills/new',function(req,res){
     res.render('forms/other_skills',{}) ;
});

app.get('/education/new',function(req,res){
     res.render('forms/education',{}) ;
});

app.get('/achievements/new',function(req,res){
     res.render('forms/achievements',{}) ;
});


app.get('/languages/new',function(req,res){
     res.render('forms/languages',{}) ;
});

app.get('/interests/new',function(req,res){
     res.render('forms/interests',{}) ;
});

app.get('/projects/new',function(req,res){
     res.render('forms/project',{}) ;
});

app.listen(8000,function(){
  console.log("Server running at port 8000");
});
