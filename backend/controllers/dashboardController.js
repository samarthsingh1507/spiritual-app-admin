const dashboardModel = require("../models/dashboardModel");

// Dashboard cards
const getDashboard = (req, res) => {
  dashboardModel.getDashboardStats((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results[0]);
  });
};

// Plan Distribution
const getPlanDistribution = (req, res) => {
  dashboardModel.getPlanDistribution((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

// Recent Users
const getRecentUsers = (req, res) => {
  dashboardModel.getRecentUsers((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

// Monthly User Growth
const getMonthlyUsers = (req, res) => {
  dashboardModel.getMonthlyUsers((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

// Active vs Inactive
const getUserStatus = (req, res) => {
  dashboardModel.getUserStatus((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

module.exports = {
  getDashboard,
  getPlanDistribution,
  getRecentUsers,
  getMonthlyUsers,
  getUserStatus,
};