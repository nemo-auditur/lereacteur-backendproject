const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../Models/User");

router.post("/publish", async (req, res) => {
  // on lit le header authorization
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({
      error: "Missing Authorization Header"
    });
    return;
  }
  // on extrait le token et on vérifie que c'est bien un Bearer
  const parts = req.headers.authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      error: "Invalid Authorization Header"
    });
    return;
  }
  const token = parts[1];
  // on cherche l'utilisateur associé a ce token
  const user = await User.findOne({ token });
  if (!user) {
    res.status(401).json({
      error: "Invalid Token"
    });
    return;
  }
  // si on a trouvé l'utilisateur on peut ajouter une annonce
  const { title, description } = req.body;
  const offer = new Offer({
    title,
    description
  });
  await offer.save();
  res.status(204).send();
});

module.exports = router;
