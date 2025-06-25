const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load .env first

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = parseInt(process.env.PORT || "1000", 10);

// Database connection
const mongoose = require("./config/db");

// Routes
const authRoute = require("./routes/authRoute");
const licenseRoute = require("./routes/licenseRoute");
const messageRoute = require("./routes/messageRoute");
const userRoute = require("./routes/userRoutes");

// Allow CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
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

app.listen(port, () => console.log(`server connected at ${port}`));
