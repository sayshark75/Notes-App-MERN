const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Config/connect");
const jwtVerify = require("./Middleware/jwt.middleware");
const userRouter = require("./Routes/user.Route");
const noteRouter = require("./Routes/note.Route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
  res.send("Running Backend For Notes App");
});

app.use(userRouter);

app.use(jwtVerify);

app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connectDB;
    console.log("Connected to DB");
  } catch (error) {
    console.log("error: ", error);
  }

  console.log(`Server Started with ${process.env.port}`);
});

module.exports = app;
