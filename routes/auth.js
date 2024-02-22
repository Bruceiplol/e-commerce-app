const express = require("express");
const authRouter = express.Router();

const Auth = require("../controllers/authController");
const AuthInstance = new Auth();

module.exports = (app, passport) => {
  app.use("/auth", authRouter);

  authRouter.post("/register", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthInstance.register(data);
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  authRouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await AuthInstance.login({ username, password });

        req.session.authenticated = true;
        req.session.user = response;
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
