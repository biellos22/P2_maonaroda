const mongoose = require('mongoose');

class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      this.isConnected = false;
      DatabaseSingleton.instance = this;
    }
    return DatabaseSingleton.instance;
  }

  async connect() {
    if (this.isConnected) {
      console.log('🔄 Reutilizando conexão ativa com o MongoDB (Singleton).');
      return;
    }

    try {
      await mongoose.connect(process.env.MONGO_URI);
      this.isConnected = true;
      console.log('🔗 MongoDB conectado com sucesso via padrão Singleton!');
    } catch (error) {
      console.error('Erro ao conectar com o MongoDB (Singleton):', error.message);
      process.exit(1);
    }
  }
}

const instance = new DatabaseSingleton();

module.exports = () => instance.connect();