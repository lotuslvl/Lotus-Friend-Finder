// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var friendslist = require('./app/data/friends.js');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

//html routes are here
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  });
  
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "public/survey.html"));
  });


	// API Routes
	app.get('/api/allfriends', function(req, res) {
		res.json(friendslist);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var completedform = req.body;
    console.log(completedform);
		// Add new user to friendslist
		friendslist.push(completedform);
    //startonmatch
    var matchName = '';
    var matchImage = '';
    
		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
