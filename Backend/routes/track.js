const express = require("express");
const router = express.Router();

const { Track } = require("../controllers/trackingController");
const { isSignedIn } = require("../middlewares/user");

router.get("/track/:id", isSignedIn, Track);

module.exports = router;
