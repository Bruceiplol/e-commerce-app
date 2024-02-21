const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderItemModel {
  static async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "order_items") + "RETURNING *";
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error creating order item: " + err.message);
    }
  }
  static async find(orderId) {
    try {
      const statement = `SELECT order_items.quantity, order_items.id, products.* 
                            FROM order_items
                            INNER JOIN products ON products.id = order_items.productId
                            WHERE "cartId" = $1`;
      const values = [orderId];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error("Error finding order item: " + err.message);
    }
  }
};
