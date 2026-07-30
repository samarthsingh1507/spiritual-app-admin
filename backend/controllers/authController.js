const authService = require("../services/authService");

// Register Admin
const register = (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required.",
    });
  }

  authService.registerAdmin(
    name,
    email,
    password,
    role,
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    }
  );
};

// Login Admin
const login = (req, res) => {
  const { email, password } = req.body;

  // Basic Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  authService.loginAdmin(email, password, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  });
};

module.exports = {
  register,
  login,
};