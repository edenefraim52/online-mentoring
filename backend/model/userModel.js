const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  mentor: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
