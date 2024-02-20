const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {
  async create(userId) {
    try {
      const statement = pgp.helpers.insert(userId, null, 'carts') + 'RETURNING *';
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }
      
      return null;

    } catch(err) {
      throw new Error('Error creating cart: ' + err.message);
    }
  }

  async findOneByUserId(userId) {
    try {
      const statement = `SELECT * FROM carts WHERE userId = $1`;
      const values = [userId];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error('Error finding cart: ' + err.message )
    }
  }
}