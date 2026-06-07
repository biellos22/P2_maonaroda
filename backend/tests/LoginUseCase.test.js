const LoginUseCase = require('../useCases/LoginUseCase');
const UserRepository = require('../repositories/UserRepository');

jest.mock('../repositories/UserRepository');

describe('Suíte de Testes: LoginUseCase (BDD e Mocks)', () => {
  it('Dado credenciais corretas, Quando tentar logar, Então deve retornar os dados sem a senha', async () => {
    const mockUser = {
      _id: '12345',
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'senha-segura',
      tipo: 'cliente',
      bairro: 'Centro'
    };
    UserRepository.findByEmail.mockResolvedValue(mockUser);

    const resultado = await LoginUseCase.execute({ email: 'maria@teste.com', senha: 'senha-segura' });
    expect(resultado.nome).toBe('Maria');
    expect(resultado.id).toBe('12345');
    expect(resultado.senha).toBeUndefined();
  });

  it('Dado um email inexistente, Quando tentar logar, Então deve lançar erro de cadastro', async () => {
    UserRepository.findByEmail.mockResolvedValue(null);
    await expect(LoginUseCase.execute({ email: 'fantasma@teste.com', senha: '123' }))
      .rejects.toThrow('Email não encontrado. Cadastre-se primeiro.');
  });

  it('Dado uma senha errada, Quando tentar logar, Então deve lançar erro de senha incorreta', async () => {
    const mockUser = { email: 'joao@teste.com', senha: 'senha-certa' };
    UserRepository.findByEmail.mockResolvedValue(mockUser);

    await expect(LoginUseCase.execute({ email: 'joao@teste.com', senha: 'senha-errada' }))
      .rejects.toThrow('Senha incorreta.');
  });

});