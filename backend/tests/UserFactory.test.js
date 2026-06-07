const UserFactory = require('../factories/UserFactory');

describe('Suíte de Testes: UserFactory (TDD e BDD)', () => {
  it('Dado um payload válido de cliente, Quando a Factory for chamada, Então deve retornar a entidade Cliente', () => {
    const payloadCliente = { 
      nome: 'Gabriel', 
      email: 'gabriel@teste.com', 
      senha: '123', 
      tipo: 'cliente', 
      telefone: '21999999999', 
      cidade: 'Maricá', 
      bairro: 'Centro' 
    };

    const user = UserFactory.create(payloadCliente);
    expect(user.tipo).toBe('cliente');
    expect(user.nome).toBe('Gabriel');
    expect(user.categoria).toBeUndefined();
  });

  it('Dado um prestador sem categoria, Quando a Factory for chamada, Então deve lançar um erro', () => {
    const payloadInvalido = { 
      nome: 'João', 
      email: 'joao@teste.com', 
      senha: '123', 
      tipo: 'prestador',
      telefone: '21999999999', 
      cidade: 'Maricá', 
      bairro: 'Centro' 
    };
    expect(() => UserFactory.create(payloadInvalido)).toThrow('A categoria é obrigatória para prestadores.');
  });

});