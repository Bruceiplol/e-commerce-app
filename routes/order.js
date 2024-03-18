const express = require("express");
const orderRouter = express.Router();

const Order = require("../controllers/orderController");
const OrderInstance = new Order();

const { ensureAuthentication } = require("./middlewares");

module.exports = (app) => {
  app.use("/api/order", ensureAuthentication, orderRouter);

  orderRouter.get("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await OrderInstance.list(id);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  orderRouter.get("/:orderId", async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const response = await OrderInstance.findByOrderId(orderId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
