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
    console.log("New Friend" + newFriend); 
    //Comparing Variables 
    var perfectMatch = matchNinjaCharacter(newFriend);
    console.log(perfectMatch); 

    //Adding the new friend to the list 
    friendList.push(newFriend); 

    //Sending the match back to the browser 
    res.json(perfectMatch); 
  })
};

function matchNinjaCharacter(newFriend){
  //Loop through all the TMNT Characters 
  for(var i =0; i < friendList.length; i++){
    var totalDiff = 0, charcterScore = 0,  friendScore =0; 
    
    for (let j = 0; j < friendList[i]["scores"].length; j++) {
      charcterScore += parseInt(friendList[i]["scores"][j]);
      
    }
    
    for(var idx = 0; i < newFriend.scores.length; idx++) {
      friendScore += (parseInt(newFriend.scores[idx]));
    }
    console.log("TMNT total: "+ charcterScore); 
    console.log("New Frien total: "+ friendScore); 

    totalDiff = friendScore - charcterScore ; 
    if (totalDiff < charcterScore ){ 
      console.log("Prefect match" + friendList[i].name); 
    }
    else { 
        //default 
        friendList[0];
    }
     
      //REturn the friend 
      return friendList[i]; 
    // }
  }
 
}