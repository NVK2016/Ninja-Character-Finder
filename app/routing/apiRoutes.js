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
    console.log("POst request");
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
  
  console.log("TMNT" + friendList.length); 

  var matchCharacter ; 
  var totalDiff = 7; 

  for(var i =0; i < friendList.length; i++){

    
    
    //Compute Difference between each question 
    for (var j = 0; j < newFriend.scores.length; j++) {

      //REset Values 
      var questionDiff = 0, charcterScore = 0,  newFriendScore =0; 
      
      charcterScore += parseInt(friendList[i]["scores"][j]);
      
      newFriendScore += parseInt(newFriend.scores[j]); 
      questionDiff += charcterScore - newFriendScore ; 
      // console.log("TMNT total: "+ charcterScore); 
      // console.log("Friend Score: "+ newFriendScore); 
      console.log("TOtal Diff: "+ questionDiff); 
    }
    //Closest DIffernce 
      if( questionDiff < totalDiff ){ 
        totalDiff = questionDiff; 
        matchCharacter =  friendList[i]; 
      }
     
  }

   //Return the Matched Character 
   return matchCharacter; 
 
}