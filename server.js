// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var friends = require('./app/data/friends.js');
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
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {

	// Capture the user input object
  var userInput = req.body;
  // console.log('userInput = ' + JSON.stringify(userInput));

  var userResponses = userInput.scores;


  // Compute best friend match
  var matchName = '';
  var matchImage = '';
  var totalDifference = 10000; // Make the initial value big for comparison

  // Examine all existing friends in the list
  for (var i = 0; i < friends.length; i++) {
    // console.log('friend = ' + JSON.stringify(friends[i]));

    // Compute differenes for each question
    var diff = 0;
    for (var j = 0; j < userResponses.length; j++) {
      diff += Math.abs(friends[i].scores[j] - userResponses[j]);
    }
   

    // If lowest difference, record the friend match
    if (diff < totalDifference) {
 
      totalDifference = diff;
      matchName = friends[i].name;
      matchImage = friends[i].photo;
    }
  }

  // Add new user
  friends.push(userInput);

  // Send appropriate response
  res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    
	});
