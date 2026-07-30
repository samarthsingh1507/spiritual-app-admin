const db = require("../config/db");

// Dashboard cards
const getDashboardStats = (callback) => {
  const sql = `
    SELECT
      COUNT(*) AS totalUsers,
      SUM(status = 'Active') AS activeUsers,
      SUM(plan = 'Premium') AS premiumUsers,
      SUM(plan = 'Gold') AS goldUsers
    FROM users
  `;

  db.query(sql, callback);
};

// Plan Distribution
const getPlanDistribution = (callback) => {
  const sql = `
    SELECT
      plan,
      COUNT(*) AS users
    FROM users
    GROUP BY plan
    ORDER BY plan;
  `;

  db.query(sql, callback);
};

// Recent Users
const getRecentUsers = (callback) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      plan,
      status
    FROM users
    ORDER BY id DESC
    LIMIT 5;
  `;

  db.query(sql, callback);
};

// Monthly User Growth
const getMonthlyUsers = (callback) => {
  const sql = `
    SELECT
      DATE_FORMAT(created_at,'%b') AS month,
      COUNT(*) AS users,
      MONTH(created_at) AS monthNumber
    FROM users
    GROUP BY MONTH(created_at), DATE_FORMAT(created_at,'%b')
    ORDER BY monthNumber;
  `;

  db.query(sql, callback);
};

// Active vs Inactive
const getUserStatus = (callback) => {
  const sql = `
    SELECT
      status,
      COUNT(*) AS users
    FROM users
    GROUP BY status;
  `;

  db.query(sql, callback);
};

module.exports = {
  getDashboardStats,
  getPlanDistribution,
  getRecentUsers,
  getMonthlyUsers,
  getUserStatus,
};