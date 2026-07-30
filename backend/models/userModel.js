const db = require("../config/db");

// Get Users with Search, Filters & Pagination
const getAllUsers = (
  search,
  page,
  limit,
  plan,
  status,
  callback
) => {
  const offset = (page - 1) * limit;

  let where = [];
  let values = [];

  // Search
  if (search) {
    where.push("(name LIKE ? OR email LIKE ?)");
    values.push(`%${search}%`, `%${search}%`);
  }

  // Plan Filter
  if (plan && plan !== "All") {
    where.push("plan = ?");
    values.push(plan);
  }

  // Status Filter
  if (status && status !== "All") {
    where.push("status = ?");
    values.push(status);
  }

  const whereClause =
    where.length > 0
      ? `WHERE ${where.join(" AND ")}`
      : "";

  const sql = `
    SELECT *
    FROM users
    ${whereClause}
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    sql,
    [...values, Number(limit), Number(offset)],
    (err, users) => {
      if (err) return callback(err);

      const countSql = `
        SELECT COUNT(*) AS total
        FROM users
        ${whereClause}
      `;

      db.query(
        countSql,
        values,
        (countErr, countResult) => {
          if (countErr) return callback(countErr);

          callback(null, {
            users,
            totalUsers: countResult[0].total,
          });
        }
      );
    }
  );
};

// Create User
const createUser = (user, callback) => {
  const sql =
    "INSERT INTO users (name, email, plan, status) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [user.name, user.email, user.plan, user.status],
    callback
  );
};

// Update User
const updateUser = (id, user, callback) => {
  const sql =
    "UPDATE users SET name=?, email=?, plan=?, status=? WHERE id=?";

  db.query(
    sql,
    [user.name, user.email, user.plan, user.status, id],
    callback
  );
};

// Delete User
const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id=?";

  db.query(sql, [id], callback);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};