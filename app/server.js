//dependencies for express and bodyparser
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});