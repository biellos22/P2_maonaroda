require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json()); // Habilita o parser de JSON para o corpo das requisições

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] Recebi requisição: ${req.method} ${req.originalUrl}`);
  next();
});
// Rotas da API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));