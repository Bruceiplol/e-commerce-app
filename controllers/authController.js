const createError = require("http-errors");
const UserModel = require("../models/userModel");
const UserModelInstance = new UserModel();
const bcrypt = require("bcrypt");

module.exports = class Auth {
  async getAll() {
    const user = await UserModelInstance.display();
    return user;
  }

  async register(data) {
    const { email, username, password } = data;

    try {
      const userEmail = await UserModelInstance.findOneByEmail(email);
      const userName = await UserModelInstance.findOneByUsername(username);

      if (userEmail) {
        throw createError(409, "Email already in use");
      }

      if (userName) {
        throw createError(409, "Username already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newData = {
        ...data,
        password: hashedPassword,
      };

      return await UserModelInstance.create(newData);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { username, password } = data;

    try {
      const user = await UserModelInstance.findOneByEmailOrUsername(username);

      if (!user) {
        throw createError(401, "Incorrect username or password");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw createError(401, "Incorrect username or password");
      }

      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
