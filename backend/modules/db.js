const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_URL;

const mongoConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Mongoose connected.......");
  } catch (err) {
    console.log("Mongoose Error:", err);
  }
};

module.exports = mongoConnect;




//mongodb+srv://mumtaj:mumtaj@mumtaz.iqmcosu.mongodb.net/?appName=Mumtaz