// Create relative paths to our htmls and public files
var path = require("path")

// Export HTML routes to the Server 
module.exports = function (app) {
  // Home page 
  app.get('/', function (req, res) {
    // console.log(path.join(__dirname, '../public/home.html'));
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  // Survery page
  app.get('/survey', function (req, res) {

    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });
  // If no match found redirect to home 
  app.get('*', function (req, res) {

    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });
}; 