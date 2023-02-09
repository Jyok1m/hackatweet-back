// Import mongoose:
const mongoose = require("mongoose");

// Create the schema:
const userSchema = mongoose.Schema({
  firstname: String,
  username: String,
  password: String,
  token: String,
});

// Create the model:
const Users = mongoose.model("users", userSchema);

// Export the model:
module.exports = Users;
