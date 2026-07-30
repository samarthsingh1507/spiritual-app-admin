const userModel = require("../models/userModel");

// GET Users with Search, Filters & Pagination
const getUsers = (req, res) => {
  const search = req.query.search || "";
  const plan = req.query.plan || "All";
  const status = req.query.status || "All";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  userModel.getAllUsers(
    search,
    page,
    limit,
    plan,
    status,
    (err, data) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json({
        users: data.users,
        totalUsers: data.totalUsers,
        currentPage: page,
        totalPages: Math.ceil(data.totalUsers / limit),
      });
    }
  );
};

// POST Add User
const addUser = (req, res) => {
  userModel.createUser(req.body, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to add user",
      });
    }

    res.status(201).json({
      message: "User added successfully",
      id: result.insertId,
    });
  });
};

// PUT Update User
const editUser = (req, res) => {
  const { id } = req.params;

  userModel.updateUser(id, req.body, (err) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to update user",
      });
    }

    res.json({
      message: "User updated successfully",
    });
  });
};

// DELETE User
const deleteUser = (req, res) => {
  const { id } = req.params;

  userModel.deleteUser(id, (err) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to delete user",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
};