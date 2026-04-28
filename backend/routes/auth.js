const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
    [req.body.name, req.body.email, hash]
  );

  res.send("Registered");
});

// login
router.post("/login", async (req, res) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [req.body.email]
  );

  const valid = await bcrypt.compare(
    req.body.password,
    user.rows[0].password
  );

  if (!valid) return res.send("Invalid");

  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    "secret"
  );

  res.json({ token });
});

// create admin
router.get("/create-admin", async (req, res) => {
  const hash = await bcrypt.hash("Admin@123", 10);

  await pool.query(
    "INSERT INTO users(name,email,password,role,subscription_status) VALUES($1,$2,$3,$4,$5)",
    ["Admin","admin@golf.com",hash,"admin","active"]
  );

  res.send("Admin Created");
});

module.exports = router;