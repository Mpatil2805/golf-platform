const router = require("express").Router();
const pool = require("../db");

router.post("/add", async (req, res) => {
  const { user_id, score, date } = req.body;

  const exists = await pool.query(
    "SELECT * FROM scores WHERE user_id=$1 AND date=$2",
    [user_id, date]
  );

  if (exists.rows.length) return res.send("Duplicate");

  const data = await pool.query(
    "SELECT * FROM scores WHERE user_id=$1 ORDER BY date ASC",
    [user_id]
  );

  if (data.rows.length >= 5) {
    await pool.query("DELETE FROM scores WHERE id=$1", [data.rows[0].id]);
  }

  await pool.query(
    "INSERT INTO scores(user_id,score,date) VALUES($1,$2,$3)",
    [user_id, score, date]
  );

  res.send("Added");
});

module.exports = router;
