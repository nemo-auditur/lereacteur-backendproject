// La ligne suivante ne doit être utilisée qu'une seule fois et au tout début du projet. De préférence dans index.js
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const formidableMiddleware = require("express-formidable");
// import de cors: permet de recevoir des fichiers d'un autre port que le localhost.
const cors = require("cors");

const app = express();

//utilisation de cors permettant de recevoir des fichiers.
app.use(cors());
// utilisation de formidable
app.use(formidableMiddleware());

// Configuration de cloudinary
/* cloudinary.config({
  cloud_name: "sample",
  api_key: "874837483274837",
  api_secret: "a676b67565c6767a6767d6767f676fe1"
}); */

// On test que le serveur réponde bien à une requête basique.

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./Models/User");

const LogIn = require("./Routes/LogIn");
const SignUp = require("./Routes/SignUp");

app.use(LogIn);
app.use(SignUp);

// Exemple de requête cloudinary
/* cloudinary.uploader.upload(req.files.picture.path, function(error, result) {
  console.log(result.secure_url);
}); */

// Ne pas oublier de faire en sorte que le serveur écoute le bon port.
app.listen(4000, () => {
  console.log("Server Started");
});
