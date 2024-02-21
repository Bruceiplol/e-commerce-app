const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartItemModel {
  static async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "cart_items") + "RETURNING *";
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error creating cart item: " + err.message);
    }
  }

  static async update(id, data) {
    try {
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const statement =
        pgp.helpers.update(data, null, "cart_items") + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error updating cart item: " + err.message);
    }
  }

  static async find(cartId) {
    try {
      const statement = `SELECT cart_items.quantity, cart_items.id, products.* 
                            FROM cart_items
                            INNER JOIN products ON products.id = cart_items.productId
                            WHERE "cartId" = $1`;
      const values = [cartId];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error("Error finding cart items: " + err.message);
    }
  }

  static async delete(id) {
    try {
      const statement = `DELETE FROM "cart_items" WHERE id = $1 RETURNING *`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error deleting cart item: " + err.message);
    }
  }
};
