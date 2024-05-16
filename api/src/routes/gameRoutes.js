const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authentificateToken = require('../middleware/authentificateToken'); 

router.post('/roll', authentificateToken, gameController.rollDice);

module.exports = router;