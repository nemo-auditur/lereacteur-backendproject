const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../Models/User");

// CREATE

router.post("/user/sign_up", async (req, res) => {
  try {
    // Create and hash password.
    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(req.fields.password + salt).toString(encBase64);

    // Create new User
    const user = new User({
      email: req.fields.email,
      token: token,
      salt: salt,
      hash: hash,
      account: {
        username: req.fields.username,
        phone: req.fields.phone
      }
    });

    console.log(user);
    await user.save();
    res.json(user);

    /* await User.save(function(err) {
      if (err) {
        console.log("erreur");
        return res.json(err.message);
      } else {
        console("return");
        return res.json({
          _id: user._id,
          token: user.token,
          account: user.account
        });
      }
    });  */
  } catch (e) {
    res.console.error(e);
  }
});
module.exports = router;
