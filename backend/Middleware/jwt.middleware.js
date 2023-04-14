const jwt = require("jsonwebtoken");
const flag = require("../Config/flags");

require("dotenv").config();
const tokenKey = process.env.tokenKEY;

const jwtVerify = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, tokenKey);
    if (decoded) {
      req.body.user = decoded.userID;
      next();
    } else {
      res.send({ msg: "Session End, Please Login", flag: flag.warn });
    }
  } else {
    res.send({ msg: "Please Login First", flag: flag.warn });
  }
};

module.exports = jwtVerify;
