const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const {
  getNotifications,
  addNotification,
  editNotification,
  deleteNotification,
} = require("../controllers/notificationController");

// Protected Routes
router.get("/", protect, getNotifications);
router.post(
  "/",
  protect,
  authorize("SuperAdmin"),
  addNotification
);

router.put(
  "/:id",
  protect,
  authorize("SuperAdmin"),
  editNotification
);

router.delete(
  "/:id",
  protect,
  authorize("SuperAdmin"),
  deleteNotification
);
module.exports = router;