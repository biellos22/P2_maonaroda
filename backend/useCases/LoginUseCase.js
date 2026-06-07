const UserRepository = require('../repositories/UserRepository');

class LoginUseCase {
  async execute({ email, senha }) {
    // 1. Busca o utilizador no banco de dados através do Repository
    const user = await UserRepository.findByEmail(email);
    
    // 2. Regras de negócio e validações
    if (!user) {
      throw new Error('Email não encontrado. Cadastre-se primeiro.');
    }
    if (user.senha !== senha) {
      throw new Error('Senha incorreta.');
    }

    // 3. Retorna apenas os dados necessários
    return {
      id: user._id,
      nome: user.nome,
      tipo: user.tipo,
      bairro: user.bairro
    };
  }
}

module.exports = new LoginUseCase();