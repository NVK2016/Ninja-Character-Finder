// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App & seeting an inital port 
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//the path that you provide to the express.static function is relative to the directory from where you launch your node process. 
//If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:

app.use('/static', express.static(path.join(__dirname, '/app/public')));

// ROUTER
// =============================================================

// require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


// LISTINER -- Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  