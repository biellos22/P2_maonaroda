const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/ProviderController');

router.get('/providers', ProviderController.getProviders);

module.exports = router;