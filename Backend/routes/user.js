const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getLoggedInUserDetail,
} = require("../controllers/userController");

const { getAllUsers } = require("../controllers/adminController");

const { isSignedIn } = require("../middlewares/user");
const { isAdmin } = require("../middlewares/admin");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isSignedIn, logout);
router.get("/userProfile", isSignedIn, getLoggedInUserDetail);

// Admin Route
router.get("/admin/userList", isSignedIn, isAdmin, getAllUsers);

module.exports = router;