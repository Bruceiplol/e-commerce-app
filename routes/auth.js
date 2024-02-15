const express = require('express')
const authRouter = express.Router()

const Auth = require('../controllers/authController')
const AuthInstance = new Auth()

module.exports = (app, passport) => {
  
  app.use('/auth', authRouter)

  authRouter.get("/", async (req, res) => {
    const response = await AuthInstance.getAll()
    res.send(response)
  })

  authRouter.post("/register", async(req, res, next) => {
    try {
      const data = req.body

      if(!data.username || !data.email || !data.password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
      }

      const response = await AuthInstance.register(data)
      res.status(201).send(response)
    } catch (err) {
      next(err)
    }
  })

  authRouter.post('/login', passport.authenticate('local', {failureRedirect:"/login"}), async (req, res, next) => {
    try {
      const {username, password} = req.body
      const response = await AuthInstance.login({username, password})

      req.session.authenticated = true
      req.session.user = {
        username,
        password
      }
      res.status(200).send(response)
    } catch(err){
      next(err)
    }
  })

}

