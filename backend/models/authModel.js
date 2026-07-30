const db = require("../config/db");

// Find admin by email
const findAdminByEmail = (email, callback) => {
  const sql = `
    SELECT *
    FROM admins
    WHERE email = ?
    LIMIT 1
  `;

  db.query(sql, [email], callback);
};

// Create a new admin
const createAdmin = (name, email, password, role, callback) => {
  const sql = `
    INSERT INTO admins (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, password, role], callback);
};

module.exports = {
  findAdminByEmail,
  createAdmin,
};