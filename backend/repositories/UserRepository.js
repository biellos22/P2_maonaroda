const User = require('../models/User');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async save(userInstance) {
    return await userInstance.save();
  }

  // Já vamos deixar o método de busca pronto para depois
  async findProviders(filter) {
    return await User.find(filter).select('-senha');
  }
}

module.exports = new UserRepository();