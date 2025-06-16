const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_STRING);

const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));

db.once("open", () => console.log("Connected to MongoDB"));

module.exports = mongoose;
