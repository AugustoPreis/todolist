const { User } = require('../models/User');

class UserRepository {
  async findOne(where) {
    return await User.findOne({ where });
  }
}

const userRepository = new UserRepository();

module.exports = { userRepository, UserRepository };