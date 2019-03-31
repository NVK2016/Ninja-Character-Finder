//Load Data all from file 
var friendList = require('../data/friends');

module.exports = function(app){
  //API GET Requests 
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  app.post('/api/friends', function(req, res){
    friendList.push(req.body); 
    res.json(); 
  })
};