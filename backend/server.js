require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running...");
});

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/score", require("./routes/score"));
app.use("/charity", require("./routes/charity"));
app.use("/draw", require("./routes/draw"));
app.use("/admin", require("./routes/admin"));
app.use("/payment", require("./routes/payment"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("Server running");
});