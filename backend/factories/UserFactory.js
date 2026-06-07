const User = require('../models/User');

class UserFactory {
  static create(payload) {
    const { nome, email, senha, tipo, telefone, cidade, bairro, categoria, descricao } = payload;

    if (tipo === 'prestador') {
      if (!categoria) throw new Error('A categoria é obrigatória para prestadores.');
      return new User({
        nome, email, senha, tipo, telefone, cidade, bairro, categoria, descricao
      });
    } 
    
    if (tipo === 'cliente') {
      return new User({
        nome, email, senha, tipo, telefone, cidade, bairro
      });
    }

    throw new Error('Tipo de usuário inválido fornecido à Factory.');
  }
}

module.exports = UserFactory;