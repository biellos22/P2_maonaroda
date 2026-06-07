const User = require('../models/User');
class UserFactory {
  static create(data) {
    if (data.tipo === 'cliente') {
      if (!data.nome || !data.email || !data.senha) {
        throw new Error('Dados incompletos para Cliente.');
      }
      return {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        tipo: 'cliente'
      };
    } 
    else if (data.tipo === 'prestador') {
      if (!data.nome || !data.email || !data.senha || !data.telefone || !data.categoria || !data.bairro) {
        throw new Error('Dados incompletos para Prestador. Telefone, Categoria e Bairro são obrigatórios.');
      }
      return {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        categoria: data.categoria,
        bairro: data.bairro,
        tipo: 'prestador'
      };
    } 
    else if (data.tipo === 'admin') {
      return new User({
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        tipo: 'admin'
      });
    }
    else {
      throw new Error('Tipo de usuário inválido.');
    }
  }
}

module.exports = UserFactory;