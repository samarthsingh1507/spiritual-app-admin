const notificationModel = require("../models/notificationModel");

// ==========================
// GET Notifications
// ==========================
const getNotifications = (req, res) => {
  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  notificationModel.getAllNotifications(
    search,
    page,
    limit,
    (err, data) => {
      if (err) {
        console.error("MYSQL ERROR:", err);

        return res.status(500).json({
          message: err.message,
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      }

      res.json({
        notifications: data.notifications,
        totalNotifications: data.totalNotifications,
        currentPage: page,
        totalPages: Math.ceil(data.totalNotifications / limit),
      });
    }
  );
};

// ==========================
// CREATE Notification
// ==========================
const addNotification = (req, res) => {
  console.log("Incoming Notification:");
  console.log(req.body);

  notificationModel.createNotification(req.body, (err, result) => {
    if (err) {
      console.error("MYSQL ERROR:", err);

      return res.status(500).json({
        message: err.message,
        code: err.code,
        sqlMessage: err.sqlMessage,
      });
    }

    res.status(201).json({
      message: "Notification created successfully",
      id: result.insertId,
    });
  });
};

// ==========================
// UPDATE Notification
// ==========================
const editNotification = (req, res) => {
  const { id } = req.params;

  console.log("Updating Notification:");
  console.log(req.body);

  notificationModel.updateNotification(
    id,
    req.body,
    (err) => {
      if (err) {
        console.error("MYSQL ERROR:", err);

        return res.status(500).json({
          message: err.message,
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      }

      res.json({
        message: "Notification updated successfully",
      });
    }
  );
};

// ==========================
// DELETE Notification
// ==========================
const deleteNotification = (req, res) => {
  const { id } = req.params;

  notificationModel.deleteNotification(
    id,
    (err) => {
      if (err) {
        console.error("MYSQL ERROR:", err);

        return res.status(500).json({
          message: err.message,
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      }

      res.json({
        message: "Notification deleted successfully",
      });
    }
  );
};

module.exports = {
  getNotifications,
  addNotification,
  editNotification,
  deleteNotification,
};