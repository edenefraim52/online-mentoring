const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();
const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on PORT ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.codeChat = new Map();

io.on("connection", function (socket) {
  socket.on("send-changes", function (data) {
    io.emit("receive-changes", data);
  });
});
mongoose
  .connect(
    "mongodb+srv://eden_efraim:mentor11@cluster0.woeh4ez.mongodb.net/online-mentoring",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connection Succeed!");
  })
  .catch((err) => {
    console.log(err.message);
  });
