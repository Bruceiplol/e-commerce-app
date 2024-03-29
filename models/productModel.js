const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class productModel {
  async findOneById(id) {
    try {
      const statement = `SELECT * FROM products WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error finding product by id: " + err.message);
    }
  }

  async find(options = {}) {
    try {
      const statement = `SELECT * FROM products`;
      const values = [];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error("Error finding product: " + err.message);
    }
  }
};
