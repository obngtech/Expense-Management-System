const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db Connection established...");
  } catch (error) {
    console.log("Db Connection Error: ", error.message);
  }
};

module.exports = connectDb;
