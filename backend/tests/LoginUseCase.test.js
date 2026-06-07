const LoginUseCase = require('../useCases/LoginUseCase');
const UserRepository = require('../repositories/UserRepository');

// TDD Avançado: Dizemos ao Jest para "fingir" (mockar) o banco de dados
jest.mock('../repositories/UserRepository');

describe('Suíte de Testes: LoginUseCase (BDD e Mocks)', () => {

  // Cenário 1: Login com Sucesso
  it('Dado credenciais corretas, Quando tentar logar, Então deve retornar os dados sem a senha', async () => {
    // Preparação (Given): Simulamos o que o banco de dados responderia
    const mockUser = {
      _id: '12345',
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'senha-segura',
      tipo: 'cliente',
      bairro: 'Centro'
    };
    UserRepository.findByEmail.mockResolvedValue(mockUser);

    // Ação (When): Executamos o caso de uso
    const resultado = await LoginUseCase.execute({ email: 'maria@teste.com', senha: 'senha-segura' });

    // Verificação (Then): Comprovamos o comportamento esperado
    expect(resultado.nome).toBe('Maria');
    expect(resultado.id).toBe('12345');
    expect(resultado.senha).toBeUndefined(); // BDD: Garante que a senha não vaza pro front!
  });

  // Cenário 2: Tratamento de Erros (Usuário não existe)
  it('Dado um email inexistente, Quando tentar logar, Então deve lançar erro de cadastro', async () => {
    // Simulamos o banco não encontrando ninguém
    UserRepository.findByEmail.mockResolvedValue(null);

    // Verificamos se o sistema bloqueia corretamente
    await expect(LoginUseCase.execute({ email: 'fantasma@teste.com', senha: '123' }))
      .rejects.toThrow('Email não encontrado. Cadastre-se primeiro.');
  });

  // Cenário 3: Tratamento de Erros (Senha incorreta)
  it('Dado uma senha errada, Quando tentar logar, Então deve lançar erro de senha incorreta', async () => {
    // Simulamos um usuário real do banco
    const mockUser = { email: 'joao@teste.com', senha: 'senha-certa' };
    UserRepository.findByEmail.mockResolvedValue(mockUser);

    // Tentamos logar com a senha errada
    await expect(LoginUseCase.execute({ email: 'joao@teste.com', senha: 'senha-errada' }))
      .rejects.toThrow('Senha incorreta.');
  });

});