const User = require('../models/User');

class SearchByBairro {
  execute(bairro) { return User.find({ tipo: 'prestador', bairro }).select('-senha'); }
}

class SearchByCategoria {
  execute(categoria) { return User.find({ tipo: 'prestador', categoria }).select('-senha'); }
}

class SearchCombinar {
  execute(bairro, categoria) { return User.find({ tipo: 'prestador', bairro, categoria }).select('-senha'); }
}

class SearchContexto {
  constructor() { this.strategy = null; }
  setStrategy(strategy) { this.strategy = strategy; }
  
  async search(bairro, categoria) {
    if (bairro && categoria) {
      this.setStrategy(new SearchCombinar());
      return await this.strategy.execute(bairro, categoria);
    } else if (bairro) {
      this.setStrategy(new SearchByBairro());
      return await this.strategy.execute(bairro);
    } else if (categoria) {
      this.setStrategy(new SearchByCategoria());
      return await this.strategy.execute(categoria);
    }
    return await User.find({ tipo: 'prestador' }).select('-senha');
  }
}

module.exports = SearchContexto;