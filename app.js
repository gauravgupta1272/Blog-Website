//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a Blog website where you can post your blogs in few clicks.";
const aboutContent = "I am an undergraduate student, currently in 3rd year, pursuing my B.tech engineering in Electronics and Communications from NIT, Surat."
const contactContent = "You Can contact me on:  ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts= [];

app.get("/",function(req,res){
  res.render(__dirname+"/views/home.ejs", {StartingContent: homeStartingContent, posts: posts});
})
app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle == requestedTitle){
           res.render(__dirname+"/views/post.ejs",{
            title: post.title, 
            content: post.content});
      // console.log("Match Found");
    }
  })
})



app.get("/about",function(req,res){
  res.render(__dirname+"/views/about.ejs",{aboutContent: aboutContent });
})

app.get("/contact",function(req,res){
  res.render(__dirname+"/views/contact.ejs",{contactContent: contactContent });
})

app.get("/compose",function(req,res){
  res.render(__dirname+"/views/compose.ejs");
})

app.post("/compose",function(req,res){
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
