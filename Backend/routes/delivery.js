const express = require("express");
const router = express.Router();

const {
  createDelivery,
  getMyOrders,
  cancelMyDelivery,
  getMonthWiseDelivery,
  countDelivery,
} = require("../controllers/deliveryController");
const { isSignedIn } = require("../middlewares/user");
const { isAdmin } = require("../middlewares/admin");
const {
  getAllOrders,
  updateDeliveryStatus,
  deliveryCancel,
} = require("../controllers/adminController");

// User Delivery Route
router.post("/createDelivery", isSignedIn, createDelivery);
router.get("/myorder", isSignedIn, getMyOrders);
router.delete("/cancel/:id", isSignedIn, cancelMyDelivery);
router.get("/getMonthWise/:year/month-wise", isSignedIn, getMonthWiseDelivery);
router.get("/countdelivery", isSignedIn, countDelivery);

// Admin Delivery Route
router.get("/admin/deliveries", isSignedIn, isAdmin, getAllOrders);
router.put("/admin/delivery/:id", isSignedIn, isAdmin, updateDeliveryStatus);
router.get("/admin/delivery/cancel/:id", isSignedIn, isAdmin, deliveryCancel);

module.exports = router;
