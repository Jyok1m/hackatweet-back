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
    const newTweet = new Tweets({ tweet, timestamp, author: data._id });
    newTweet.save().then(() => res.json({ result: true }));
  });
});

// Route to get all the tweets from the DB:
router.get("/all", (req, res) => {
  Tweets.find({})
    .populate("author")
    .then((data) => res.json({ result: true, tweets: data }));
});

// Route to delete a tweet from the DB:
router.delete("/delete/:tweetId", (req, res) => {
  const { tweetId } = req.params;
  Tweets.findByIdAndDelete(tweetId).then(() => res.json({ result: true }));
});

// Route export:
module.exports = router;
