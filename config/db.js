// const { default: mongoose } = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE_STRING);

// const db = mongoose.connection;

// db.on("error", (error) => console.error("MongoDB connection error:", error));

// db.once("open", () => console.log("Connected to MongoDB"));

// module.exports = mongoose;

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_STRING);

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
