const db = require("../config/db");

// ============================
// Get Notifications
// ============================
const getAllNotifications = (
  search,
  page,
  limit,
  callback
) => {
  const offset = (page - 1) * limit;

  let where = "";
  let params = [];

  if (search) {
    where = `WHERE title LIKE ? OR message LIKE ?`;
    params.push(`%${search}%`, `%${search}%`);
  }

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM notifications
    ${where}
  `;

  db.query(countQuery, params, (err, countResult) => {
    if (err) return callback(err);

    const total = countResult[0].total;

    const dataQuery = `
      SELECT *
      FROM notifications
      ${where}
      ORDER BY created_at DESC
      LIMIT ?
      OFFSET ?
    `;

    db.query(
      dataQuery,
      [...params, limit, offset],
      (err, rows) => {
        if (err) return callback(err);

        callback(null, {
          notifications: rows,
          totalNotifications: total,
        });
      }
    );
  });
};

// ============================
// Create Notification
// ============================
const createNotification = (notification, callback) => {

  if (!notification.scheduled_at) {
    notification.scheduled_at = null;
  }

  db.query(
    "INSERT INTO notifications SET ?",
    notification,
    callback
  );
};

// ============================
// Update Notification
// ============================
const updateNotification = (
  id,
  notification,
  callback
) => {

  if (!notification.scheduled_at) {
    notification.scheduled_at = null;
  }

  db.query(
    "UPDATE notifications SET ? WHERE id=?",
    [notification, id],
    callback
  );
};

// ============================
// Delete Notification
// ============================
const deleteNotification = (
  id,
  callback
) => {
  db.query(
    "DELETE FROM notifications WHERE id=?",
    [id],
    callback
  );
};

module.exports = {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};