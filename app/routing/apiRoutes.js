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

    //Friend Details 
    console.log(req.body.scores);
    console.log(req.body.name);
    console.log(req.body.photo);

    //Adding the new friend to the list 
    friendList.push(req.body); 

    //Sending the match back to the browser 
    res.json(); 
  })
};