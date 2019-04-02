//Load Data all from file 
var friendList = require('../data/friends');

module.exports = function (app) {
  //API GET Requests 
  //returns all the friends from the file in a JSON format 
  app.get('/api/friends', function (req, res) {
    res.json(friendList);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  app.post('/api/friends', function (req, res) {

    //Data related 
    var newFriend = req.body;
    var newFriendScores = [];
    console.log("POst request");
    //Convert the scores
    for (var i = 0; i < newFriend.scores.length; i++) {
      newFriendScores.push(parseInt(newFriend.scores[i]));
    }
    newFriend.scores = newFriendScores;
    console.log("New Friend" + newFriend);
    //Comparing Variables 
    var perfectMatch = matchNinjaCharacter(newFriend);
    console.log(perfectMatch);

    //Adding the new friend to the list 
    // friendList.push(newFriend);

    //Sending the match back to the browser 
    res.json(perfectMatch);
  })
};

function matchNinjaCharacter(newFriend) {
  //Loop through all the TMNT Characters 

  console.log("TMNT" + friendList.length);
  var newFriendScore = newFriend.scores.reduce((total, num) => total + Number(num), 0);
  console.log(newFriendScore);

  // make var to track closest match
  var closestMatchIndex;
  var closestMatchDiff;

  // loop over all ninja character array
  friendList.forEach((element, index) => {
    // get each friend score
    const friendScore = element.scores.reduce((total, num) => total + Number(num), 0);
    // find difference
    const diff = Math.abs(friendScore - newFriendScore);
    // if no match yet, this is the closest match
    if (!closestMatchDiff) {
      closestMatchDiff = diff;
      closestMatchIndex = index;
      // else if the new diff is smaller, this is the closest match
    } else if (closestMatchDiff && diff < closestMatchDiff) {
      closestMatchDiff = diff;
      closestMatchIndex = index;
    }
  });

  console.log(friendList[closestMatchIndex], closestMatchDiff)

  //Return the Matched Character 
  return friendList[closestMatchIndex];

}