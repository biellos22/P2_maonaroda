const UserRepository = require('../repositories/UserRepository');
const UserFactory = require('../factories/UserFactory');

class RegisterUserUseCase {
  async execute(payload) {
    const { nome, email, senha, tipo, telefone, bairro } = payload;

    // 1. Validação básica (Clean Code: Fail Fast)
    if (!nome || !email || !senha || !tipo || !telefone || !bairro) {
      throw new Error('Por favor, preencha todos os campos obrigatórios.');
    }

    // 2. Verifica se o email já existe usando o Repository
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    // 3. Aplica o nosso Design Pattern (Factory)
    const newUser = UserFactory.create(payload);

    // 4. Salva no banco de dados usando o Repository
    return await UserRepository.save(newUser);
  }
}

module.exports = new RegisterUserUseCase();