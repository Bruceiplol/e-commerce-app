const express = require('express')
const userRouter = express.Router()
const User = require('../controllers/userController')

const userInstance = new User()

const ensureAuthentication = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  } else {
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

//get{Id}

//put{Id}