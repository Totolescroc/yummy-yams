const Game = require('../models/Game');
const User = require('../models/User');
const Pastry = require('../models/Pastry');

exports.rollDice = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const user = await User.findById(req.user.id);
    // if (user.attempts >= 3) {
    //   return res.status(403).send('Vous avez atteint le nombre maximal de tentatives (3).');
    // }

    user.attempts += 1;
    await user.save();

    const rollSingleDie = () => Math.floor(Math.random() * 6) + 1;

    let dice = Array.from({ length: 5 }, rollSingleDie);
    let counts = new Array(6).fill(0);
    dice.forEach(num => counts[num - 1]++);

    const maxCount = Math.max(...counts);
    let result;
    let pastryAward = [];
    switch (maxCount) {
      case 5:
        result = "YAM'S";
        pastryAward = await awardPastries(3);
        break;
      case 4:
        result = "CARRÉ";
        pastryAward = await awardPastries(2);
        break;
      default:
        let pairs = counts.filter(count => count === 2).length;
        if (pairs === 2) {
          result = "DOUBLE";
          pastryAward = await awardPastries(1);
        } else {
          result = "NO WIN";
        }
        break;
    }

    if (!pastryAward || pastryAward.length === 0) {
      result = "NO WIN";
    }

    const newGame = new Game({
      userId: req.user.id,
      dice: dice,
      score: dice.reduce((total, num) => total + num, 0),
      result: result,
      pastryWon: pastryAward.map(p => p.name).join(', ') // Ajouter les noms des pâtisseries gagnées
    });
    await newGame.save();

    res.json({
      message: `Vous avez obtenu un ${result}!`,
      dice: dice,
      attemptsLeft: 3 - user.attempts,
      pastryAward: pastryAward.map(p => ({ name: p.name, image: p.image })) // Afficher les noms et les images des pâtisseries remportées
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const awardPastries = async (count) => {
  try {
    const pastries = await Pastry.find({ stock: { $gt: 0 } });
    if (pastries.length < count) {
      return []; // Pas assez de pâtisseries en stock
    }
    const awarded = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * pastries.length);
      const pastry = pastries[randomIndex];
      pastry.stock -= 1;
      pastry.quantityWon += 1;
      await pastry.save();
      awarded.push(pastry);

      // Retirer la pâtisserie sélectionnée de la liste pour éviter de la sélectionner à nouveau
      pastries.splice(randomIndex, 1);
    }
    return awarded;
  } catch (error) {
    console.error('Error awarding pastries:', error);
    return [];
  }
};
