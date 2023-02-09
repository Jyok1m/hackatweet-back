// Express JS boilerplate:
var express = require("express");
var router = express.Router();

// Require the model:
const Users = require("../models/users");

// Require the functional modules:
const { checkBody } = require("../modules/checkBody");

// Require the security modules:
const uid2 = require("uid2"); //? For token generation
const bcrypt = require("bcrypt"); //? For password hashing

//! Signup new user:
router.post("/signup", function (req, res) {
  // Declare the variables:
  const { firstname, username, password } = req.body;

  // Check if the fields are empty or null:
  if (!checkBody([firstname, username, password])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Determine password REGEX:
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  /*
  	The password must contain at least 1 lowercase alphabetical character
    The password must contain at least 1 uppercase alphabetical character
  	The password must contain at least 1 numeric character
    The password must contain at least one special character
  	The password must be eight characters or longer
  */

  // Check if the password matches with the REGEX:
  if (!passwordRegex.test(password)) {
    res.json({
      result: false,
      error: "Please retry. Your password must contain one of the following:",
    });
    return;
  }

  // Check if the user is already in the database:
  Users.findOne({ username }).then((data) => {
    if (data) {
      res.json({
        result: false,
        error: "User already in the database. Please login.",
      });
    } else {
      // If all the tests have been validated, hash the password:
      const hash = bcrypt.hashSync(password, 10);

      // Save the info in the database:
      const newUser = new Users({
        firstname,
        username,
        password: hash,
        token: uid2(32),
      });

      newUser.save().then(() => {
        res.json({ result: true, token: newUser.token });
      });
    }
  });
});

// Route export:
module.exports = router;
