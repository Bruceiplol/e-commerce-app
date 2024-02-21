const express = require("express");
const productRouter = express.Router();

const Product = require("../controllers/productController");
const ProductInstance = new Product();

module.exports = (app) => {
  app.use("/products", productRouter);

  productRouter.get("/", async (req, res, next) => {
    try {
      const queryParams = req.query;

      const response = await ProductInstance.list(queryParams);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  productRouter.get("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;
      const response = await ProductInstance.get(productId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};

