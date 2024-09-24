const Delivery = require("../models/delivery");

const packages = [
  {
    id: "TR123456789",
    status: "In Transit",
    location: "New York",
    coordinates: [40.7128, -74.006],
  },
  {
    id: "TR987654321",
    status: "Delivered",
    location: "Los Angeles",
    coordinates: [34.0522, -118.2437],
  },
];

const Track = async (req, res) => {
  const package = packages.find((p) => p.id === req.params.id);
  if (package) {
    res.json(package);
  } else {
    res.status(404).json({ error: "Package not found" });
  }
};

module.exports = {
  Track,
};
