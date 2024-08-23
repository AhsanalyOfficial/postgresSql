const pool = require("../db/db");

const createUser = async (username, password, email, address) => {
  const res = await pool.query(
    "INSERT INTO users (username, password, email, address) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, password, email, address]
  );
  return res.rows[0];
};

const getUserById = async (id) => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

const getAllUsers = async () => {
  const res = await pool.query("SELECT * FROM users");
  return res.rows;
};

const deleteUserById = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  deleteUserById,
};
