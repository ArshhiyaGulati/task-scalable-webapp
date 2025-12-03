const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");
const pool = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// CORS FIXED COMPLETELY
// --------------------
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ERROR HANDLER
app.use(errorHandler);

// DB test
pool.query("SELECT NOW()", (err) => {
  if (err) console.log("❌ DB error:", err.message);
  else console.log("✅ Database connected successfully");
});

// Start
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
