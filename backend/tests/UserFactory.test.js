const UserFactory = require('../factories/UserFactory');

describe('Suíte de Testes: UserFactory (TDD e BDD)', () => {
  
  // Cenário 1: Comportamento de Sucesso (BDD)
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

    // Validações (Expectativas)
    expect(user.tipo).toBe('cliente');
    expect(user.nome).toBe('Gabriel');
    expect(user.categoria).toBeUndefined(); // Cliente não pode ter categoria
  });

  // Cenário 2: Comportamento de Erro (Fail Fast)
  it('Dado um prestador sem categoria, Quando a Factory for chamada, Então deve lançar um erro', () => {
    const payloadInvalido = { 
      nome: 'João', 
      email: 'joao@teste.com', 
      senha: '123', 
      tipo: 'prestador', // É prestador, mas esquecemos de mandar a categoria!
      telefone: '21999999999', 
      cidade: 'Maricá', 
      bairro: 'Centro' 
    };

    // Validando se o sistema realmente bloqueia e lança o erro correto
    expect(() => UserFactory.create(payloadInvalido)).toThrow('A categoria é obrigatória para prestadores.');
  });

});