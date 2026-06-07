require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/usersRoutes'); // Importa só rotas de usuário

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', usersRoutes);

const PORT = 5001; // Porta dedicada!
app.listen(PORT, () => console.log(`🚀 Microsserviço de USUÁRIOS rodando na porta ${PORT}`));