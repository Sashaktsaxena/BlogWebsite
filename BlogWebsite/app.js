//jshint esversion:6

//const express = require("express");
import express from "express";
//const bodyParser = require("body-parser");
import bodyParser from "body-parser";
import mongoose from "mongoose";
// const ejs = require("ejs");
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// let posts=[];
//let head=[];
mongoose.connect("mongodb://127.0.0.1/blogDB");
const postSchema={
  title:String,
  post:String

}
const Post=mongoose.model("Post",postSchema);
app.get("/", (req,res)=>{
    Post.find()
    .then(posts=>{
      res.render("home.ejs",{text:homeStartingContent,posts:posts});
    })
    .catch(function(err){
      console.log(err);
    })
})


app.get("/about", (req,res)=>{
  
  res.render("about.ejs",{text:aboutContent});
});
app.get("/contact", (req,res)=>{
  
  res.render("contact.ejs",{text:contactContent});
});
app.get("/compose", (req,res)=>{
  
  res.render("compose.ejs",{text:contactContent});
});

app.post("/compose",(req,res)=>{

  const post=new Post({
    title:req.body.titlename,
    post:req.body.postname
  });
  post.save()
  .then(()=>{
    console.log("succesfully saved");
  })
  .catch((error)=>{
    console.log(error);
    
  })
  // posts.push(post);
  //head.push(post.title);
  // posts.push(post);
  // plen=posts.length;

  // res.redirect("/",{content:posts,len:plen});
  res.redirect("/");
})



app.get("/:postId", function(req, res){
  const requestedPostId = req.params.postId;
 
  Post.findOne({_id:requestedPostId})
  .then(function (post) {
    res.render("post", {
            head: post.title,
            text: post.post
          });
    })
    .catch(function(err){
      console.log(err);
    })
 
 
});
  // console.log(req.params.topic);
  // // for(var i=0;i<posts.length;i++){           //one method to this is by running for loop
  // //   if(req.params.topic=posts[i].title)
  // //   console.log("match found!");
  // // }
  
  // posts.forEach(function(post){
    
  //   const URL="/topics/"
  //   if(req.params.topic===post.title.replace(' ', '-').toLowerCase()){

  //     console.log("match found");

  //     res.render("post.ejs",{head:post.title,text:post.post})
  //   }
    
  // });












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
