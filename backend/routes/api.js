const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ==========================================
// ROTA 1: CADASTRO (Register)
// POST /api/register
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha, tipo, telefone, cidade, bairro, categoria, descricao } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !tipo || !telefone || !bairro) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }
    
    if (tipo === 'prestador' && !categoria) {
        return res.status(400).json({ message: 'A categoria é obrigatória para prestadores.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }

    const newUser = new User({
      nome,
      email,
      senha,
      tipo,
      telefone,
      cidade,
      bairro,
      categoria: tipo === 'prestador' ? categoria : undefined,
      descricao
    });

    const savedUser = await newUser.save();

    // --- AQUI ESTAVA FALTANDO A RESPOSTA! ---
    // Sem isso, o frontend ficava travado esperando.
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: savedUser });
    
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: 'Erro no servidor ao tentar cadastrar.', error: error.message });
  }
});

// ==========================================
// ROTA 2: BUSCA DE PRESTADORES
// GET /api/providers
// ==========================================
router.get('/providers', async (req, res) => {
  try {
    const { categoria, bairro } = req.query;
    const filter = { tipo: 'prestador' };

    if (categoria) filter.categoria = categoria;
    if (bairro) filter.bairro = bairro;

    const providers = await User.find(filter).select('-senha');
    res.status(200).json(providers);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar prestadores.', error: error.message });
  }
});

// ==========================================
// ROTA 3: LOGIN
// POST /api/login
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Procura se o email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email não encontrado. Cadastre-se primeiro.' });
    }

    // 2. Verifica a senha
    if (user.senha !== senha) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // 3. Sucesso
    res.json({ 
      message: 'Login realizado com sucesso',
      user: { 
        id: user._id, 
        nome: user.nome, 
        tipo: user.tipo,
        bairro: user.bairro // <--- ADICIONE ESTA LINHA AQUI
      } 
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;