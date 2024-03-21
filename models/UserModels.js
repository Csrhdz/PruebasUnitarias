const pool = require('../db');

class UserModel {
  async getAllUsers() {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);
    return rows;
  }

  async getUserById(userId) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  }
}

module.exports = new UserModel();