const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//紀錄API呼叫當下時間
app.use(function (req, res, next) {
  console.log("Date:", new Date());
  console.log("Time:", Date.now());
  next();
});

//路由設定
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const resumeRouter = require("./routes/resume");
const msgRouter = require("./routes/msg");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/resume", resumeRouter);
app.use("/msg", msgRouter);

const listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
