const express = require("express");
const app = express();
const cors = require("cors");

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const mime = require("mime");

const session = require("express-session");
const fileStore = require("session-file-store")(session);

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "this",
    resave: false,
    saveUninitialize: true,
    // store: new fileStore(), // 세션 객체에 세션스토어를 적용
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);

    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});

const upload = multer({ storage });

app.post("/photo", upload.array("file"), (req, res) => {
  const { file, zzz } = req?.body || {};

  res.status(200).send({
    msg: "OK",
  });
});

app.get("/photo", (req, res) => {
  var upload_folder = "./uploads/";
  var file = upload_folder + req.query.fileName; // ex) /upload/files/sample.txt

  try {
    if (fs.existsSync(file)) {
      // 파일이 존재하는지 체크
      var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
      var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴

      res.setHeader("Content-disposition", "attachment; filename=" + filename); // 다운받아질 파일명 설정
      res.setHeader("Content-type", mimetype); // 파일 형식 지정

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
    } else {
      res.send("해당 파일이 없습니다.");
      return;
    }
  } catch (e) {
    // 에러 발생시
    console.log("에러!", e);
    res.send("파일을 다운로드하는 중에 에러가 발생하였습니다.");
    return;
  }

  res.send("!");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/login", (req, res) => {
  const { id, pw } = req.body;

  req.session.loginUser = {
    id: id,
    pw: pw,
  };

  console.log(req.session.loginUser);

  res.send("zz");
});

app.get("/login", (req, res) => {
  console.log(req.session);

  res.send("zz");
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
