const express = require("express");
const app = express();
const cors = require("cors");

const fs = require("fs");
const multer = require("multer");

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now());
  },
});

const upload = multer({ storage });

app.post("/photo", upload.array("file"), (req, res) => {
  const { file, zzz } = req?.body || {};

  console.log(req.body, req?.file, req?.files);

  res.status(200).send({
    msg: "OK",
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/add/products", (req, res) => {
  console.log(req.query);

  res.send("/");
});

app.get("/products", (req, res) => {});

app.listen(port, (req, res) => {
  console.log("?");
  const dir = "./uploads";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});
