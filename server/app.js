//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors= require('cors');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cors({origin:'http://localhost:3001',credentials:true}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/articles")

.get(function(req, res){
  Article.find(function(err, foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newArticle = new Article({
    key:req.body.key,
    id:req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/articles/delete")
.post(function(req,res){
  const t=req.body.title;
  const con=req.body.content;
    Article.findOne({title: t,content:con}, function(err, foundArticle){
      if (foundArticle) {
        Article.deleteOne({_id:foundArticle.id},function(e){
          res.send(e);
        });
      } else {
        res.send("Failed to delete");
      }
    });}
    
)
.get(function(req, res){

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected article.");
      }
    }
  );
})

.patch(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
