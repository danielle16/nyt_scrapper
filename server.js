const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

var app = express();
var PORT = 3000; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));








app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});

