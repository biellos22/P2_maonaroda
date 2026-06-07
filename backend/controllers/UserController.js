const RegisterUserUseCase = require('../useCases/RegisterUserUseCase');
const LoginUseCase = require('../useCases/LoginUseCase');

class UserController {
  async register(req, res) {
    try {
      const savedUser = await RegisterUserUseCase.execute(req.body);
      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: savedUser });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const user = await LoginUseCase.execute(req.body);
      return res.json({ message: 'Login realizado com sucesso', user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();