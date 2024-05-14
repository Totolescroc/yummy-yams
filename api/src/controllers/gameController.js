const Game = require('../models/Game');
const User = require('../models/User');

exports.rollDice = async (req, res) => {
  // Assurez-vous que l'utilisateur est authentifié
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    // Vérifier les tentatives de l'utilisateur
    const user = await User.findById(req.user.id);
    if (user.attempts >= 3) {
      return res.status(403).send('Vous avez atteint le nombre maximal de tentatives (3).');
    }

    // Incrémenter le compteur de tentatives
    user.attempts += 1;
    await user.save();

    // Fonction pour lancer un dé
    const rollSingleDie = () => Math.floor(Math.random() * 6) + 1;

    // Lancer cinq dés
    let dice = Array.from({ length: 5 }, rollSingleDie);
    let counts = new Array(6).fill(0);
    dice.forEach(num => counts[num - 1]++);

    // Déterminer la combinaison obtenue
    const maxCount = Math.max(...counts);
    let result;
    switch (maxCount) {
      case 5:
        result = "YAM'S";
        break;
      case 4:
        result = "CARRÉ";
        break;
      default:
        let pairs = counts.filter(count => count === 2).length;
        result = pairs === 2 ? "DOUBLE" : "NO WIN";
        break;
    }

    // Trouver les pâtisseries à attribuer selon le résultat
    let pastryAward = null;
    if (result === "YAM'S") {
      pastryAward = "3 pâtisseries";
    } else if (result === "CARRÉ") {
      pastryAward = "2 pâtisseries";
    } else if (result === "DOUBLE") {
      pastryAward = "1 pâtisserie";
    }

    // Créer un enregistrement de jeu
    const newGame = new Game({
      userId: req.user.id,
      dice: dice,
      score: dice.reduce((total, num) => total + num, 0), // Exemple simple de calcul de score
      result: result,
      pastryWon: pastryAward
    });
    await newGame.save();

    // Réponse au client
    res.json({
      message: `Vous avez obtenu un ${result}!`,
      dice: dice,
      attemptsLeft: 3 - user.attempts,
      pastryAward: pastryAward
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};
