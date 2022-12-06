const {
  login,
  getAllStudents,
  createSession,
  getCodeBlock,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/Login", login);
router.get("/Lobby", getAllStudents);
router.post("/CodeBlock", login);
router.post("/CodeBlock/createSession", createSession);
router.post("/CodeBlock/getCodeBlock", getCodeBlock);

module.exports = router;
