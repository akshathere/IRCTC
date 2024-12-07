const { ADMIN_API_KEY } = require('../config/env');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');
exports.authenticateAdminKey = (req, res, next) => {
  const token = req.headers['authorization'];
  const decoded = jwt.verify(token, SECRET_KEY);
  if (decoded.role!='admin') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  next();
};
