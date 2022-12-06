const User = require("../model/userModel");
const codeBlock = require("../model/codeBlockModel");
const session = require("../model/sessionModel");

//login try - checking if the user input matches the existing users in the db.
module.exports = {
  login: async function (req, res, next) {
    try {
      const { username, password, mentor } = req.body;
      User.findOne({ username }, (_, user) => {
        if (user.username !== username)
          return res.json({
            msg: "Incorrect Username or Password ",
            status: false,
            user,
          });
        if (user.password !== password)
          return res.json({
            msg: "Incorrect Username or Password ",
            status: false,
            user,
          });
        return res.json({ status: true, user });
      });
    } catch (ex) {
      next(ex);
    }
  },

  getAllStudents: function (req, res, next) {
    try {
      User.find({ mentor: false }, (_, users) => {
        res.json(users);
      });
    } catch (ex) {
      res.send("something went wrong!");
    }
  },
  createSession: async function (req, res, next) {
    try {
      const { uuid, user, codeBlockID } = req.body;
      session.create({
        uuid,
        user,
        codeBlockID,
      });
      return res.json({ status: true });
    } catch (ex) {
      next(ex);
    }
  },
  getCodeBlock: async function (req, res, next) {
    try {
      const { codeBlockNum } = req.body;
      codeBlock.findOne({ codeBlockID: codeBlockNum }, (_, code_Block) => {
        res.json(code_Block);
      });
    } catch (ex) {
      next(ex);
    }
  },
};
