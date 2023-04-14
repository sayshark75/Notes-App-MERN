const { Router } = require("express");

const noteModel = require("../Model/Notes.Model");

require("dotenv").config();
const tokenKey = process.env.tokenKEY;

const jwt = require("jsonwebtoken");

const flag = require("../Config/flags");

const noteRouter = Router();

noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, tokenKey);
    if (decoded.userID) {
      const notes = await noteModel.find({ user: decoded.userID });
      res.send({ msg: "Get User Notes", notes, flag: flag.success });
    } else {
      res.send({ msg: "Unable To Get Notes", flag: flag.error });
    }
  } catch (error) {
    res.send({ msg: "Unable To Get Notes", error, flag: flag.error });
  }
});

noteRouter.post("/", async (req, res) => {
  try {
    const note = new noteModel(req.body);
    await note.save();
    res.send({ msg: "Notes Created Successfully", flag: flag.success });
  } catch (error) {
    res.send({ msg: "Unable to Create Notes", error, flag: flag.error });
  }
});

noteRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await noteModel.findByIdAndUpdate({ _id: id }, data);
    res.send({ msg: "Note is Updated", flag: flag.success });
  } catch (error) {
    res.send({ msg: "Unable to Update Notes", error, flag: flag.error });
  }
});

noteRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await noteModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Note is Deleted", flag: flag.success });
  } catch (error) {
    res.send({ msg: "Unable to Delete Notes", error, flag: flag.error });
  }
});

module.exports = noteRouter;
