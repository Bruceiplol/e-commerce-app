const express = require('express')
const router = express.Router()

const authRouter = require('./auth')
const userRouter = require('./user')
const productRouter = require('./product')

module.exports = (app, passport) => {
  authRouter(app, passport)
  userRouter(app)
  productRouter(app)
}