const summaryModel = require("../models/summaryModel");

// ====================================
// Get All User Details
// ====================================
const getAllUserDetails = (req, res) => {
  summaryModel.getAllUserDetails((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

// ====================================
// Get Single User Details
// ====================================
const getUserDetailsById = (req, res) => {
  const { id } = req.params;

  summaryModel.getUserDetailsById(id, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(results[0]);
  });
};

module.exports = {
  getAllUserDetails,
  getUserDetailsById,
};