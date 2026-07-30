const bcrypt = require("bcrypt");

const authModel = require("../models/authModel");
const generateToken = require("../utils/generateToken");

// Register Admin
const registerAdmin = (name, email, password, role = "Admin", callback) => {
  // Check if email already exists
  authModel.findAdminByEmail(email, async (err, results) => {
    if (err) {
      return callback(err);
    }

    if (results.length > 0) {
      return callback(null, {
        success: false,
        message: "Email already exists.",
      });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save admin
      authModel.createAdmin(
        name,
        email,
        hashedPassword,
        role,
        (err, result) => {
          if (err) {
            return callback(err);
          }

          callback(null, {
            success: true,
            message: "Admin registered successfully.",
          });
        }
      );
    } catch (error) {
      callback(error);
    }
  });
};

// Login Admin
const loginAdmin = (email, password, callback) => {
  authModel.findAdminByEmail(email, async (err, results) => {
    if (err) {
      return callback(err);
    }

    if (results.length === 0) {
      return callback(null, {
        success: false,
        message: "Invalid email or password.",
      });
    }

    const admin = results[0];

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return callback(null, {
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(admin);

    callback(null, {
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
};