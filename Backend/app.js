const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const user = require("./routes/user");
const delivery = require("./routes/delivery");
const count = require("./routes/count");
const track = require("./routes/track");

require("dotenv").config();

//middlewares
app.use(express.json());

//cookies
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// morgan middleware
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/v1", user);
app.use("/api/v1", delivery);
app.use("/api/v1", count);
app.use("/api/v1", track);

module.exports = app;
