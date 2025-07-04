const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load .env first

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = parseInt(process.env.PORT || "1000", 10);

// Database connection
// const mongoose = require("./config/db");
const connectDB = require("./config/db");

// app.use(async (req, res, next) => {
// await connectDB();
// next();
// });
connectDB(); // Call once during startup

// Routes
const authRoute = require("./routes/authRoute");
const licenseRoute = require("./routes/licenseRoute");
const messageRoute = require("./routes/messageRoute");
const userRoute = require("./routes/userRoutes");
const appointmentRoute = require("./routes/appointmentRoute");
const keysRoute = require("./routes/keysRoute");

// Allow CORS
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    // or ['http://localhost:3000', 'https://yourdomain.com']
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser("TYjh68YfaUYeakGaoQwW03F"));

// Mount routes
app.use("/auth", authRoute);
app.use("/license", licenseRoute);
app.use("/messages", messageRoute);
app.use("/user", userRoute);
app.use("/appointment", appointmentRoute);
app.use("/keys", keysRoute);

// Handle root route
app.get("/", (req, res) => res.send("API is up and running"));

// Handle favicon to avoid timeouts
app.get("/favicon.ico", (req, res) => res.status(204).end());

// 👇 Only listen when running directly (e.g., node server.js)
// if (require.main === module) {
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
// }

// module.exports = app;
