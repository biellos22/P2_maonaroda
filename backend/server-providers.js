require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const providersRoutes = require('./routes/providersRoutes'); // Importa só rotas de busca

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', providersRoutes);

const PORT = 5002; // Porta dedicada!
app.listen(PORT, () => console.log(`🔎 Microsserviço de BUSCA rodando na porta ${PORT}`));