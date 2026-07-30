const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const protect = require("../middleware/authMiddleware");

const {
  getUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");

// Protected Routes
router.get("/", protect, getUsers);
router.post(
  "/",
  protect,
  authorize("SuperAdmin"),
  addUser
);
router.put(
  "/:id",
  protect,
  authorize("SuperAdmin"),
  editUser
);
router.delete(
  "/:id",
  protect,
  authorize("SuperAdmin"),
  deleteUser
);

module.exports = router;