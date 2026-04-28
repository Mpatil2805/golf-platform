const router = require("express").Router();
const pool = require("../db");

router.get("/run", async (req, res) => {

  let draw = [];
  while (draw.length < 5) {
    let n = Math.floor(Math.random()*45)+1;
    if(!draw.includes(n)) draw.push(n);
  }

  await pool.query("INSERT INTO draws(numbers) VALUES($1)", [draw]);

  const users = await pool.query(
    "SELECT user_id, array_agg(score) as scores FROM scores GROUP BY user_id"
  );

  const totalPool = users.rows.length * 500;

  const pool5 = totalPool * 0.40;
  const pool4 = totalPool * 0.35;
  const pool3 = totalPool * 0.25;

  let w5=[], w4=[], w3=[];

  users.rows.forEach(u=>{
    let match = u.scores.filter(s=>draw.includes(s)).length;

    if(match===5) w5.push(u.user_id);
    else if(match===4) w4.push(u.user_id);
    else if(match===3) w3.push(u.user_id);
  });

  const share5 = w5.length ? pool5/w5.length : 0;
  const share4 = w4.length ? pool4/w4.length : 0;
  const share3 = w3.length ? pool3/w3.length : 0;

  for (let u of w5) {
    await pool.query(
      "INSERT INTO winners(user_id,match_count,amount) VALUES($1,$2,$3)",
      [u,5,share5]
    );
  }

  for (let u of w4) {
    await pool.query(
      "INSERT INTO winners(user_id,match_count,amount) VALUES($1,$2,$3)",
      [u,4,share4]
    );
  }

  for (let u of w3) {
    await pool.query(
      "INSERT INTO winners(user_id,match_count,amount) VALUES($1,$2,$3)",
      [u,3,share3]
    );
  }

  res.json(draw);
});

module.exports = router;