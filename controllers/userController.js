const createError = require('http-errors');
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel();

module.exports = class User {
  async get (data) {
    const {id} = data

    try {
      const user = await UserModelInstance.findOneById(id)

      if (!user) {
        throw createError(404, 'User record not found');
      }
      return user
    } catch (err) {
      throw err
    }
  }

  async update(data) {
    const {id} = data
    try {
      let user = await UserModelInstance.findOneById(id)

      if (!user) {
        throw createError(404, 'User record not found');
      }

      user = await UserModelInstance.update(data)

      return data

    } catch(err) {
      throw err
    }
  }

}