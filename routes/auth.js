const express = require("express");
const authRouter = express.Router();

const Auth = require("../controllers/authController");
const AuthInstance = new Auth();

module.exports = (app, passport) => {
  app.use("/api/auth", authRouter);

  authRouter.get("/", async (req, res, next) => {
    try {
      const response = await AuthInstance.getAll()
      res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  })

  authRouter.post("/register", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthInstance.register(data);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  });

  authRouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    async (req, res, next) => {
      try {
        console.log(req)
        const { username, password } = req.body;
        const response = await AuthInstance.login({ username, password });

        req.session.authenticated = true;
        req.session.user = response;
        res.status(200).json(response);
      } catch (err) {
        console.log(err)
        next(err);
      }
    }
  );
};
