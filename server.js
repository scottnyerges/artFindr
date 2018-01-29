var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;

useMongoClient: true;

// creates new database 
mongoose.connect("mongodb://localhost/userdb");

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
db.User.create(
  {userHandle: "testcasehandle1", userPassword: "testcasepassword1", userFirstName: "Joe", userLastName: "Plumber", userProfilePicURL: "https://randomuser.me/api/portraits/men/57.jpg", userGender: "Male", userEmailH: "wheee@me.com", userNotes: "I am a user note", userInterests: "I am a user interest"}, 
  {userHandle: "testcasehandle2", userPassword: "testcasepassword2", userFirstName: "Jesse", userLastName: "Mechanic", userProfilePicURL: "https://randomuser.me/api/portraits/men/52.jpg", userGender: "Male", userEmailH: "whooo@me.com", userNotes: "I am a user note", userInterests: "I am a user interest"}, 
  {userHandle: "testcasehandle3", userPassword: "testcasepassword3", userFirstName: "John", userLastName: "Formery-Jan", userProfilePicURL: "https://randomuser.me/api/portraits/women/30.jpg", userGender: "Transgender", userEmailH: "whooooooa@me.com", userNotes: "I am a user note", userInterests: "I am a user interest"}, 
  {userHandle: "testcasehandle4", userPassword: "testcasepassword4", userFirstName: "Jamie", userLastName: "Awesomesauce", userProfilePicURL: "https://randomuser.me/api/portraits/women/19.jpg", userGender: "Female", userEmailH: "wawawawa@me.com", userNotes: "I am a user note", userInterests: "I am a user interest"})
  .then(function(dbUser) {
    console.log("*******************\n***The following 'user' was preloaded whem the server fired up:***\n"+dbUser+"\n*******************");
  })
  .catch(function(err) {
    console.log(err.message);
  });

// Routes

// Route for retrieving all Notes from the db
app.get("/notes", function(req, res) {
  // Find all Notes
  db.Note.find({})
    .then(function(dbNote) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get("/user", function(req, res) {
  // Find all Users
  db.User.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for saving a new Note to the db and associating it with a User
app.post("/submit", function(req, res) {
  // Create a new Note in the db
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to get all User's and populate them with their notes
app.get("/populateduser", function(req, res) {
  // Find all users
  db.User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("notes")
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});