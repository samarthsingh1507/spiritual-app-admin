const db = require("../config/db");

// ==============================
// Get All User Details
// ==============================
const getAllUserDetails = (callback) => {
  const sql = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.plan,
      u.status,
      u.created_at,
      s.summary_date,
      s.daily_summary,
      s.motivation,
      s.meditation_completed,
      s.reading_completed,
      s.gratitude_completed,
      s.last_active
    FROM users u
    LEFT JOIN user_summaries s
      ON u.id = s.user_id
    ORDER BY u.id DESC
  `;

  db.query(sql, callback);
};

// ==============================
// Get Single User Details
// ==============================
const getUserDetailsById = (id, callback) => {
  const sql = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.plan,
      u.status,
      u.created_at,
      s.summary_date,
      s.daily_summary,
      s.motivation,
      s.meditation_completed,
      s.reading_completed,
      s.gratitude_completed,
      s.last_active
    FROM users u
    LEFT JOIN user_summaries s
      ON u.id = s.user_id
    WHERE u.id = ?
    LIMIT 1
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  getAllUserDetails,
  getUserDetailsById,
};