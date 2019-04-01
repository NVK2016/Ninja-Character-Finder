//Load Data all from file 
var friendList = require('../data/friends');

module.exports = function(app){
  //API GET Requests 
  //returns all the friends from the file in a JSON format 
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  app.post('/api/friends', function(req, res){

    //Data related 
    var newFriend = req.body;
    var newFriendScores = []; 

    //Convert the scores
    for(var i = 0; i < newFriend.scores.length; i++) {
      newFriendScores.push(parseInt(newFriend.scores[i]));
    }
    newFriend.scores = newFriendScores; 
    console.log("New Friends" + newFriend); 
    //Comparing Variables 
    var perfectMatch = matchFriend(newFriend , newFriendScores);
    console.log(perfectMatch); 

    //Adding the new friend to the list 
    friendList.push(newFriend); 

    //Sending the match back to the browser 
    res.json(perfectMatch); 
  })
};

function matchFriend(newFriend, totalScore){
  for(var i =0; i < friendList.length; i++){
    var totalDiff = 0, friendScore=0; 
    
    for (let j = 0; j < friendList[i]["scores"].length; j++) {
      friendScore += parseInt(friendList[i]["scores"][j]);
      
    }
    // console.log("Old Frien total: "+ total); 
    // console.log("New Frien total: "+ totalScore); 

    totalDiff += Math.abs(totalScore - friendScore); 
    console.log("checkMatch: "+ totalDiff);

    // if ( totalDiff === 0){ 
      console.log("Prefect match" + friendList[i].name); 
      //REturn the friend 
      return friendList[i]; 
    // }
  }
 
}