const User = require('../models/User');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async save(userData) {
    const userInstance = new User(userData);
    return await userInstance.save();
  }
  async findProviders(filter) {
    return await User.find(filter).select('-senha');
  }
}

module.exports = new UserRepository();