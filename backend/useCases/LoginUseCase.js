const UserRepository = require('../repositories/UserRepository');

class LoginUseCase {
  async execute({ email, senha }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email não encontrado. Cadastre-se primeiro.');
    }
    if (user.senha !== senha) {
      throw new Error('Senha incorreta.');
    }
    return {
      id: user._id,
      nome: user.nome,
      tipo: user.tipo,
      bairro: user.bairro
    };
  }
}

module.exports = new LoginUseCase();