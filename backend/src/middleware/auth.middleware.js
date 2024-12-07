const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // const token = authHeader.split(' ')[1]; // Extract the token part from "Bearer <token>"

  try {
    // Verify the token
    const verified = jwt.verify(token, SECRET_KEY);

    // Attach user data to req.user
    req.user = verified;
    // Ensure req.user.id is set explicitly
    if (!req.user.id) {
      return res.status(400).json({ error: 'Invalid token payload. User ID missing.' });
    }

    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};
