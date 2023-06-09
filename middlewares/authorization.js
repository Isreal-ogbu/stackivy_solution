const jwt = require('jsonwebtoken');
const auth = require("../Authentication/logout");
const SECRET_KEY = '$2b$10$zZ8MuiyHKIIapJMW/p5Yn.by.Pi/LTEDObBHzgtDnduG87BKBt5qu'; // Same secret key in the .env to hash passord

// Middleware to authenticate incoming requests
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  if (auth.tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken
