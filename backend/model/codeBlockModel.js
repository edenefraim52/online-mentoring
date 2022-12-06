const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    min: 10,
    max: 100,
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  codeBlockID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Code Block", codeBlockSchema);
