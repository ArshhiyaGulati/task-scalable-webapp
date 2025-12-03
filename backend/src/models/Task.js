const db = require('../config/database');

const Task = {
  getAll: async (user_id) => {
    const result = await db.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    return result.rows;
  },

  getOne: async (id, user_id) => {
    const result = await db.query(
      `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );
    return result.rows[0];
  },

  create: async ({ user_id, title, description, status, priority, due_date }) => {
    const result = await db.query(
      `INSERT INTO tasks (user_id, title, description, status, priority, due_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title, description, status, priority, due_date]
    );
    return result.rows[0];
  },

  update: async (id, user_id, fields) => {
    const { title, description, status, priority, due_date } = fields;

    const result = await db.query(
      `UPDATE tasks SET
        title = $1,
        description = $2,
        status = $3,
        priority = $4,
        due_date = $5
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, status, priority, due_date, id, user_id]
    );

    return result.rows[0];
  },

  delete: async (id, user_id) => {
    await db.query(
      `DELETE FROM tasks WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );
    return true;
  }
};

module.exports = Task;
