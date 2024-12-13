const { StatusCodes } = require('http-status-codes');
const { userService } = require('../services/userService');

class UserController {
  async register(req, res, next) {
    try {
      const token = await userService.register(req.body);

      res.status(StatusCodes.CREATED).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const token = await userService.login(req.body);

      res.status(StatusCodes.OK).json({ token });
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController();

module.exports = { userController, UserController };