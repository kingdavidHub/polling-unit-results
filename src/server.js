require('dotenv').config();
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/delta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'delta.html'));
});



// API endpoint to get polling unit results for Delta State (state id: 25)
app.get("/api/polling-units", (req, res) => {
  const query = `
    SELECT pu.*
    FROM polling_unit pu
    JOIN lga lg ON pu.lga_id = lg.lga_id
    WHERE lg.state_id = 25
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching polling units:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
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
