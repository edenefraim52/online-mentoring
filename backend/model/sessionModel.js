const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    unique: false,
  },
  codeBlockID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
