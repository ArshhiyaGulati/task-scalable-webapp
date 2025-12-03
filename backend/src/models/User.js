const db = require('../config/database');

const User = {
  create: async ({ email, password_hash, full_name }) => {
    const result = await db.query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name, created_at`,
      [email, password_hash, full_name]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query(
      `SELECT id, email, full_name, created_at, updated_at, last_login 
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  updateProfile: async (id, full_name) => {
    const result = await db.query(
      `UPDATE users SET full_name = $1 WHERE id = $2 RETURNING id, email, full_name`,
      [full_name, id]
    );
    return result.rows[0];
  }
};

module.exports = User;
