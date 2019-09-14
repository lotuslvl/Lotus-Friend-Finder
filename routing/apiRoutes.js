
var friendlist = require("friends.js");

// Displays all possible friends
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });
  
  // Handles incoming survey results and compatibility logic
app.post("/api/friend", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newfriend = req.body;
  
    // Using a RegEx Pattern to remove spaces from newFriend
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newfriend);
  
    friendlist.friends.push(newfriend); //add new survey result to the list of friends
  
    res.json(newfriend);
  });

