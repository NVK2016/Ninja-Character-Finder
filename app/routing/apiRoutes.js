//Load Data all from file 
var ninjaList = require('../data/ninja');

module.exports = function (app) {
  //API GET Requests 
  //returns all the friends from the file in a JSON format 
  app.get('/api/ninjas', function (req, res) {
    res.json(ninjaList);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  app.post('/api/ninjas', function (req, res) {
  
    //Data related 
    var newFriend = req.body;
    var newFriendScores = [];
  
    //Convert the scores
    for (var i = 0; i < newFriend.scores.length; i++) {
      newFriendScores.push(parseInt(newFriend.scores[i]));
    }
    newFriend.scores = newFriendScores;
    
    //Comparing Variables 
    var perfectMatch = matchNinjaCharacter(newFriend);
    console.log(perfectMatch);

    //Adding the new friend to the list --in this case not reuired for future can be useful 
    // friendList.push(newFriend);

    //Sending the match back to the browser 
    res.json(perfectMatch);
  })
};

function matchNinjaCharacter(newFriend) {
  //Loop through all the TMNT Characters 

  var newFriendScore = newFriend.scores.reduce((total, num) => total + Number(num), 0);

  // make var to track closest match
  var closestMatchIndex;
  var closestMatchDiff;

  // loop over all ninja character array
  ninjaList.forEach((element, index) => {
    // get each friend score
    const ninjaScore = element.scores.reduce((total, num) => total + Number(num), 0);
    // find difference
    const diff = Math.abs(ninjaScore - newFriendScore);
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

  // console.log(ninjaList[closestMatchIndex], closestMatchDiff);

  //Return the Matched Character 
  return ninjaList[closestMatchIndex];

}