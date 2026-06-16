const UserRepository = require('../repositories/UserRepository');
const UserFactory = require('../factories/UserFactory');

class RegisterUserUseCase {
  async execute(payload) {
    const { nome, email, senha, tipo, telefone, bairro, categoria, descricao } = payload;
        if (!nome || !email || !senha || !tipo || !telefone || !bairro) {
      throw new Error('Por favor, preencha todos os campos obrigatórios.');
    }
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado.');
    }
    const newUser = UserFactory.create(payload);
    return await UserRepository.save(newUser);
  }
}

module.exports = new RegisterUserUseCase();