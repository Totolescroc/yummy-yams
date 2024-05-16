const express = require('express');
const router = express.Router();
const Pastry = require('../models/Pastry');

// Route pour récupérer toutes les pastries
router.get('/', async (req, res) => {
  try {
    const pastries = await Pastry.find();
    res.json(pastries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour mettre à jour le stock lorsque quelqu'un gagne une pastry
router.post('/win', async (req, res) => {
  const { name } = req.body;
  try {
    const pastry = await Pastry.findOne({ name });
    if (pastry && pastry.stock > 0) {
      pastry.stock -= 1;
      pastry.quantityWon += 1;
      await pastry.save();
      // si toutes les pastries sont épuisées
      const allPastries = await Pastry.find();
      const gameOver = allPastries.every(p => p.stock === 0);
      res.json({ pastry, gameOver });
    } else {
      res.status(404).json({ message: 'Pastry not found or out of stock' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
