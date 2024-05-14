const jwt = require('jsonwebtoken');

const authentificateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Aucun token fourni

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide ou expiré
    req.user = user;
    next(); // Passe au prochain middleware ou contrôleur
  });
};

module.exports = authentificateToken;
