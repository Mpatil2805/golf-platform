const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now()+file.originalname)
});

const upload = multer({ storage });

router.post("/upload-proof", upload.single("file"), async (req, res) => {
  await pool.query(
    "UPDATE winners SET proof=$1 WHERE id=$2",
    [req.file.filename, req.body.id]
  );
  res.send("Uploaded");
});

router.post("/approve", async (req, res) => {
  await pool.query(
    "UPDATE winners SET status='paid' WHERE id=$1",
    [req.body.id]
  );
  res.send("Approved");
});