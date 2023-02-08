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

//! Add a new user:
router.post("/add", function (req, res) {
  //? Declare the variables:
  const { firstName, lastName, email, password } = req.body;

  //? Check if the fields are empty:
  if (!checkBody([firstName, lastName, email, password])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  } else {
    res.json({ result: true });
  }

  // TODO: Check if the user is already in the database:
  /*

    User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
        canBookmark: true,
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });

  */
});

// Route export:
module.exports = router;
