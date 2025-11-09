// server.js
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// PostgreSQL connection (Render hosted Postgres requires SSL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render-hosted PostgreSQL
  },
});

// Test connection
pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL database!");
    client.release();
  })
  .catch((err) => console.error("❌ Database connection failed:", err));

// Handle form submission
app.post("/submit-form", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const sql = `
      INSERT INTO contacts (name, email, phone, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const result = await pool.query(sql, [name, email, phone, message]);
    console.log("✅ Data inserted with ID:", result.rows[0].id);
    res.send("Form submitted successfully!");
  } catch (err) {
    console.error("❌ PostgreSQL Error:", err);
    res.status(500).send("Error saving data: " + err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
