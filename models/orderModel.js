const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });
const OrderItemModel = require("./orderItemModel");

module.exports = class OrderModel {
  constructor(data = {}) {
    (this.status = data.status || "PENDING"),
      (this.total = data.total || 0),
      (this.userId = data.userId || null),
      (this.items = data.items || []);
  }

  addItems(items) {
    this.items = items.map((item) => new OrderItemModel(item));
  }

  async create() {
    try {
      const { items, ...order } = this;
      const statement =
        pgp.helpers.insert(order, null, "orders") + "RETURNING *";
      const result = await db.query(statement);

      if (result.rows?.length) {
        Object.assign(this, result.rows[0]);

        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error creating order: " + err.message);
    }
  }

  async update(data) {
    try {
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", {
        id: this.id,
      });
      const statement = pgp.helpers.update(data, null, "orders") + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error updating order " + err.message);
    }
  }

  async findOneByUserId(userId) {
    try {
      const statement = `SELECT * FROM orders WHERE userId = $1`;
      const values = [userId];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error finding cart: " + err.message);
    }
  }

  async findOneById(id) {
    try {
      const statement = `SELECT * FROM orderss WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error("Error finding cart: " + err.message);
    }
  }
};
