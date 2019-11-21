const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../Models/User");

// CREATE

router.post("/login", async (req, res) => {
  try {
    User.findOne({ email: req.fields.email }).exec(function(err, user) {
      if (err) return next(err.message);
      if (user) {
        if (
          SHA256(req.fields.password + user.salt).toString(encBase64) ===
          user.hash
        ) {
          return res.json({
            _id: user._id,
            token: user.token,
            account: user.account
          });
        } else {
          return res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        return next("User not found");
      }
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
