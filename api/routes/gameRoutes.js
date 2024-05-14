const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/roll', authenticateToken, gameController.rollDice);

module.exports = router;
