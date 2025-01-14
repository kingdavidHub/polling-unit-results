require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
async function connectDb() {
  try {
    db.connect((err) => {
      if (err) {
        console.error("Database connection failed:", err);
        return;
      }
      console.log("Connected to the database.");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/delta", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "delta.html"));
});

app.get("/lga", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pollingList.html"));
});

// API endpoint to get polling unit results for Delta State (state id: 25)
app.get("/api/polling-units", (req, res) => {
  try {
    const query = `
      SELECT pu.*
      FROM polling_unit pu
      JOIN lga lg ON pu.lga_id = lg.lga_id
      WHERE lg.state_id = 25
    `;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/api/lga", (req, res) => {
  const { lga_id } = req.query;
  try {
    const query = `
    SELECT *
    FROM lga
  `;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/api/polling-units/lga", (req, res) => {
  const { lga_id } = req.query;
  
  const query = `
     SELECT pu.*, w.ward_name, l.lga_name, s.state_name
    FROM polling_unit pu
    JOIN ward w ON pu.ward_id = w.ward_id
    JOIN lga l ON w.lga_id = l.lga_id
    JOIN states s ON l.state_id = s.state_id
    WHERE l.lga_id = ?
  `;
  db.query(query, [lga_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// API endpoint to get all parties for a new polling unit
app.get("/api/parties", (req, res) => {
  try {
    const query = `
      SELECT *
      FROM party
    `;

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start the server
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});

// use LGA TO FIND THE STATES
