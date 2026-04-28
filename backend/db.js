const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db.xxxxx.supabase.co",   // Supabase host
  database: "postgres",
  password: "your password",      // Supabase password
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// test connection
pool.connect()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

module.exports = pool;