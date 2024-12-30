const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/chat-app"
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;
