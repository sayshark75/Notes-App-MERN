const { Router } = require("express");
const bcrypt = require("bcrypt");

require("dotenv").config();
const tokenKey = process.env.tokenKEY;

const userModel = require("../Model/User.Model");

const jwt = require("jsonwebtoken");
const flag = require("../Config/flags");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isPresent = await userModel.find({ email, name });
    if (isPresent.length > 0) {
      res.send({ msg: "User Already Present", flag: flag.reg });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something Went Wrong", err, flag: flag.error });
        } else {
          const user = new userModel({ name, email, password: hash });
          await user.save();
          res.send({ msg: "User Added Successfully", flag: flag.success });
        }
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ msg: "Registration Filed", error, flag: flag.error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ userID: user[0]._id }, tokenKey);
          res.send({ msg: "Login Success", token, flag: flag.success });
        } else {
          res.send({ msg: "Something Went Wrong", flag: flag.error });
        }
      });
    } else {
      res.send({ msg: "Invalid Credentials", flag: flag.warn });
    }
  } catch (error) {
    res.send({ msg: "Login Failed", error, flag: flag.error });
  }
});

module.exports = userRouter;
