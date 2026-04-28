const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM charities");
  res.json(data.rows);
});

router.post("/select", async (req, res) => {
  await pool.query(
    "UPDATE users SET charity_id=$1 WHERE id=$2",
    [req.body.charity_id, req.body.user_id]
  );

  res.send("Charity selected");
});

module.exports = router;