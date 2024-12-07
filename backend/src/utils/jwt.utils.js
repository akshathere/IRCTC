const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');

exports.generateToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
