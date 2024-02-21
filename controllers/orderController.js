const createError = require("http-errors");
const OrderModel = require("../models/orderModel");
const OrderItemModel = require("../models/cartItemModel");

module.exports = class Order {
  async create(data) {
    const { userId } = data;
    try {
      const Order = new OrderModel();
      const order = await Order.create({ userId, total });

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async list(userId) {
    try {
      const orders = await OrderModel.findOneByUserId(userId);

      return orders;
    } catch (err) {
      throw err;
    }
  }

  async findByOrderId(id) {
    try {
      const order = await OrderModel.findOneById(id);
      return order;
    } catch (err) {
      throw err;
    }
  }
};
