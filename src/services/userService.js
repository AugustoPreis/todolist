const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { isValidString } = require('../utils/validators');
const { hashPassword, comparePassword } = require('../utils/crypto');
const { RequestError } = require('../utils/RequestError');
const { userRepository } = require('../repositories/userRepository');
const { User } = require('../models/User');
const { getEnvConfig } = require('../config/dotenv');

class UserService {
  signUser(user) {
    const envConfig = getEnvConfig();
    const jwtUser = user.toJSON();

    //remove props
    delete jwtUser.password;

    return jwt.sign(jwtUser, envConfig.jwt.secretKey, {
      expiresIn: envConfig.jwt.expiresIn,
    });
  }

  async register(userData) {
    const { name, email, password } = userData;

    if (!isValidString(name, { minLength: 1, maxLength: 50 })) {
      throw new RequestError('Invalid name, must contain between 1 and 50 characters', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(email, { minLength: 1, maxLength: 100 })) {
      throw new RequestError('Invalid email, must contain between 1 and 100 characters', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(password, { minLength: 6, maxLength: 20 })) {
      throw new RequestError('Invalid password, must contain between 6 and 20 characters', StatusCodes.BAD_REQUEST);
    }

    const userModel = new User();

    userModel.set('name', name.trim());
    userModel.set('email', email.trim());
    userModel.set('password', hashPassword(password));

    const userByEmail = await this.findUserByEmail(userModel.get('email'));

    if (userByEmail) {
      throw new RequestError(`There is already a user with that email`, StatusCodes.CONFLICT);
    }

    const storagedUser = await userModel.save();

    return this.signUser(storagedUser);
  }

  async login(userData) {
    const { email, password } = userData;

    if (!isValidString(email, { minLength: 1, maxLength: 100 })) {
      throw new RequestError('Invalid email, must contain between 1 and 100 characters', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(password, { minLength: 6, maxLength: 20 })) {
      throw new RequestError('Invalid password, must contain between 6 and 20 characters', StatusCodes.BAD_REQUEST);
    }

    const userModel = await this.findUserByEmail(email);

    if (!userModel || !comparePassword(password, userModel.get('password'))) {
      throw new RequestError('Invalid login', StatusCodes.UNAUTHORIZED);
    }

    return this.signUser(userModel);
  }

  async findUserByEmail(email) {
    if (!isValidString(email, { minLength: 1, maxLength: 100 })) {
      throw new RequestError('Invalid email, must contain between 1 and 100 characters', StatusCodes.BAD_REQUEST);
    }

    return await userRepository.findOne({ email });
  }
}

const userService = new UserService();

module.exports = { userService, UserService };