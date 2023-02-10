// Express JS boilerplate:
var express = require("express");
var router = express.Router();

// Require the model:
const Tweets = require("../models/tweets");

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

  // Send the infomation to the DB:
  const newTweet = new Tweets({ token, tweet, timestamp });
  newTweet.save().then(() => res.json({ result: true, token }));
});

// Route export:
module.exports = router;
