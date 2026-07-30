const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

// Protect all dashboard routes
router.use(protect);

// Dashboard Stats
router.get("/", dashboardController.getDashboard);

// Plan Distribution
router.get(
  "/plan-distribution",
  dashboardController.getPlanDistribution
);

// Recent Users
router.get(
  "/recent-users",
  dashboardController.getRecentUsers
);

// Monthly Users
router.get(
  "/monthly-users",
  dashboardController.getMonthlyUsers
);

// Active vs Inactive
router.get(
  "/user-status",
  dashboardController.getUserStatus
);

module.exports = router;