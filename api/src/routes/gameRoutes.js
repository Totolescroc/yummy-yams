const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authentificateToken = require('../middleware/authentificateToken'); // Assurez-vous que l'importation est correcte

router.post('/roll', authentificateToken, gameController.rollDice);

module.exports = router;