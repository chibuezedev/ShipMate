const Counter = require("../models/counter");

exports.getSaveCount = async (req, res) => {
  try {
    const getSave = await Counter.find({ user: req.user._id });
    if (getSave.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "0",
      });
    }
    res.status(200).json({
      success: "true",
      getSave,
    });
  } catch (e) {
    console.log(e);
  }
};
