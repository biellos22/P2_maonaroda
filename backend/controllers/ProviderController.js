const SearchProvidersUseCase = require('../useCases/SearchProvidersUseCase');

class ProviderController {
  async getProviders(req, res) {
    try {
      // Passa os filtros da URL (query) para o caso de uso
      const providers = await SearchProvidersUseCase.execute(req.query);
      return res.status(200).json(providers);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar prestadores.', error: error.message });
    }
  }
}

module.exports = new ProviderController();