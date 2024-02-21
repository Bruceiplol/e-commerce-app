const express = require("express");
const cartRouter = express.Router();

const Cart = require("../controllers/cartController");
const CartInstance = new Cart();

const { ensureAuthentication } = require("./middlewares");

module.exports = (app) => {
  app.use("/cart", ensureAuthentication, cartRouter);

  cartRouter.post("/myCart", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await CartInstance.createCart({ userId: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  cartRouter.get("/myCart", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await CartInstance.loadCart(id);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  cartRouter.post("/myCart/items", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await CartInstance.addItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  cartRouter.put("/myCart/items/:itemId", async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const response = await CartInstance.updateItem(itemId, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  cartRouter.delete("/myCart/items/:itemId", async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const response = await CartInstance.removeItem(itemId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  cartRouter.post("/myCart/checkout", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { cartId, paymentInfo } = req.body;
      const response = await CartInstance.checkout(id, cartId, paymentInfo);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
