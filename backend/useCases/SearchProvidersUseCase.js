const SearchContexto = require('../strategies/SearchStrategy');
const WhatsAppAdapter = require('../adapters/WhatsAppAdapter');

class SearchProvidersUseCase {
  async execute({ bairro, categoria }) {
    // O padrão STRATEGY é executado na camada de negócio
    const searchContext = new SearchContexto();
    const providers = await searchContext.search(bairro, categoria);

    // O padrão ADAPTER formata os dados antes de devolver ao Controller
    return providers.map(provider => WhatsAppAdapter.adapt(provider));
  }
}

module.exports = new SearchProvidersUseCase();