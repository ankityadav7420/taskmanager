const express = require("express");
const cors = require("cors");
const routes = require("./routes/taskRoute");
const authRoutes = require("./routes/authRoute");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config({ path: "./config/config.env" });
require("dotenv").config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

// Connect to the database
connectDB();

// Use the API routes
app.use("/api", routes);
app.use("/api", authRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;
