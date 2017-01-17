/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Article = require("./models/Article.js");

// Initialize Express
var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});




// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {
  Article.find({}, function(err, doc){
    if (err) throw err;
    res.send(doc);
  })
});

//save a new article route
app.post("/api/saved", function(req, res) {
  var newArticle = new Article({title: req.body.title, date: req.body.date, url:req.body.url});
  newArticle.save(function(err, doc){
    if (err) throw err;
    res.send(doc);
  })
});

//delete an article
app.post("/api/saved/delete", function(req, res) {
  Article.remove({title:req.body.title}, function(data){
  });
});



// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
