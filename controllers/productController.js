const createError = require("http-errors");
const productModel = require("../models/productModel");
const productModelInstance = new productModel();

module.exports = class Product {
  async get(id) {
    try {
      const product = await productModelInstance.findOneById(id);

      if (!product) {
        throw createError(404, "Product not found");
      }
      return product;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async list(options) {
    try {
      const products = await productModelInstance.find(options);
      return products;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
