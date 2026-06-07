const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/ProviderController');

// Rotas exclusivas do Microsserviço de Busca
router.get('/providers', ProviderController.getProviders);

module.exports = router;