const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {
  async display() {
    const statement = `SELECT * FROM users`
    const result = await db.query(statement);

    if (result.rows?.length) {
      return result.rows;
    }
  }
  
  async create(data) {
    try {
      const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      
      return null;

    } catch(err) {
      throw new Error('Error creating user: ' + err.message);
    }
  }

  async update(data) {
    try {

      const { id, ...params } = data;

      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(params, null, 'users') + condition;
  
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error('Error updating user: ' + err.message);
    }
  }

  async findOneByEmail(email) {
    try {

      const statement = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error('Error finding user by email: ' + err.message);
    }
  }

  async findOneById(id) {
    try {
      const statement = `SELECT * FROM users WHERE id = $1`;
      const values = [id];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error('Error finding user by id: ' + err.message);
    }
  }

  async findOneByUsername(username) {
    try {
      const statement = `SELECT * FROM users WHERE username = $1`;
      const values = [username];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error('Error finding user by username: ' + err.message);
    }
  }

  async findOneByEmailOrUsername(identifier) {
    try {
      const statement = `SELECT * FROM users WHERE email = $1 OR username = $1`;
      const values = [identifier];
  
      const result = await db.query(statement, values);
  
      if (result.rows?.length) {
        return result.rows[0];
      }
  
      return null;
  
    } catch (err) {
      throw new Error('Error finding user by email or username: ' + err.message);
    }
  }

  async delete(id) {
    try {
      const statement = `DELETE FROM users WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rowCount > 0) {
        return true;
      }

      return false;
    } catch(err) {
      throw new Error('Error deleting user: ' + err.message);
    }
  }
};