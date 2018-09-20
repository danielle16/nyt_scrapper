var express = require("express");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

var axios = require("axios");

var router = express.Router();
var db = require("./models/articles");
var PORT = 3000;

var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nyt_scrapper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true });



// app.get("/", function (req, res) {
//    res.send("hello world");
// });

//Scrape nyt articles 
app.get("/scraped-articles", function (req, res) {

    axios.get("https://www.nytimes.com/section/us").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".headline").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
    
      db.Article.create(result)
      .then(function(dbArticle) {
          res.json(dbArticle);
        console.log(dbArticle);
      })
      .catch(function(error) {
            console.log("An error occured")
        });  

    });
    
    res.send("Scrape Complete");
    
    }); 
});








app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});

