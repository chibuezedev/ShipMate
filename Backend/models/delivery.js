const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
  {
    deliveryMode: {
      type: String,
      enum: ["Within City", "Intercity"],
    },
    parcelType: {
      type: String,
    },
    packageWeight: {
      type: String,
      default: "Upto 1kg",
    },
    pickupLocation: {
      type: String,
    },
    dropLocation: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    deliveryPrice: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    insurance: {
      type: Number,
    },
    paymentMode: {
      type: String,

      enum: ["UPI", "COD", "Debit/Credit Card", "COP"],
    },
    paymentInfo: {
      id: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "processing",
    },
    pickupMob: {
      type: Number,
    },
    dateTime: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    receiverMob: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
