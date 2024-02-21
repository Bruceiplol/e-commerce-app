const express = require("express");
const userRouter = express.Router();
const User = require("../controllers/userController");

const userInstance = new User();

const { ensureAuthentication } = require("./middlewares");

module.exports = (app) => {
  app.use("/users", userRouter);

  userRouter.get("/:id", ensureAuthentication, async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await userInstance.get({ id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  userRouter.put("/:id", ensureAuthentication, async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const response = await userInstance.update({ id, ...data });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
