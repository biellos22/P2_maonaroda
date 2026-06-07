const SearchContexto = require('../strategies/SearchStrategy');
const WhatsAppAdapter = require('../adapters/WhatsAppAdapter');

class SearchProvidersUseCase {
  async execute({ bairro, categoria }) {
    const searchContext = new SearchContexto();
    const providers = await searchContext.search(bairro, categoria);
    return providers.map(provider => WhatsAppAdapter.adapt(provider));
  }
}

module.exports = new SearchProvidersUseCase();