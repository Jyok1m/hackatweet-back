// Express JS boilerplate:
var express = require("express");
var router = express.Router();

// Require the model:
const Tweets = require("../models/tweets");
const Users = require("../models/users");

// Require the functional modules:
const { checkBody } = require("../modules/checkBody");

// Route to send the tweets to the DB:
router.post("/send", (req, res) => {
  const { token, tweet, timestamp } = req.body;

  // Check if the fields are empty or null:
  if (!checkBody([tweet])) {
    res.json({ result: false, error: "Please enter a tweet first !" });
    return;
  }

  Users.findOne({ token }).then((data) => {
    const id = data._id;
    // Send the infomation to the DB:
    const newTweet = new Tweets({ tweet, timestamp, author: id });
    newTweet.save().then(() => res.json({ result: true }));
  });
});

// Route to get all the tweets from the DB:
router.get("/all", (res) => {
  Tweets.find({})
    .populate("author")
    .then((data) => res.json({ resulte: true, tweets: data }));
});

// Route export:
module.exports = router;
