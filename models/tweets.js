// Import mongoose:
const mongoose = require("mongoose");

// Create the schema:
const tweetSchema = mongoose.Schema({
  token: String,
  tweet: String,
  timestamp: Number,
});

// Create the model:
const Tweets = mongoose.model("tweets", tweetSchema);

// Export the model:
module.exports = Tweets;
