const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================================
   MIDDLEWARE
================================ */
app.use(cors());              // allows frontend access
app.use(express.json());      // parse JSON bodies

/* ================================
   DATABASE CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ================================
   ROUTES
================================ */
const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);
app.use("/dashboard", require("./routes/dashboardRoutes"));

/* ================================
   DEFAULT ROUTE (Health Check)
================================ */
app.get("/", (req, res) => {
  res.send("📚 Library Management API is running");
});

/* ================================
   SERVER START
================================ */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
