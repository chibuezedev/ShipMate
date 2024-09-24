const Delivery = require("../models/delivery");

const Track = async (req, res) => {
  const package = await Delivery.findOne({ trackingId: req.params.id });
  if (package) {
    res.json(package);
  } else {
    res.status(404).json({ error: "Package not found" });
  }
};

module.exports = {
  Track,
};
