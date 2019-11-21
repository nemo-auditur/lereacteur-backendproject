const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String
  },
  token: {
    type: String
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  },
  account: {
    username: {
      type: String
    },
    phone: {
      type: String
    }
  }
});

module.exports = User;
