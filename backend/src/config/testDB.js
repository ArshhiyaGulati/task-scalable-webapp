console.log("🔥 testDB.js started");

require('dotenv').config();
console.log("ENV Loaded:", process.env.DB_NAME || process.env.DATABASE_URL);

const db = require('./database');

console.log("📡 Running query...");

db.query('SELECT NOW()')
  .then(res => {
    console.log("✅ Connected! Time:", res.rows[0].now);
  })
  .catch(err => {
    console.error("❌ DB Error:", err);
  });

