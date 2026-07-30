const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getAllUserDetails,
  getUserDetailsById,
} = require("../controllers/summaryController");

// Protect all routes
router.use(protect);

// Get all users with summary
router.get("/", getAllUserDetails);

// Get single user details
router.get("/:id", getUserDetailsById);

module.exports = router;