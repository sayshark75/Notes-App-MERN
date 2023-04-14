const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', true);

const connectDB = mongoose.connect(process.env.mongoURL);

module.exports = connectDB;
