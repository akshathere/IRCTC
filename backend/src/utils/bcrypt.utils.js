const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => bcrypt.hash(password, 10);
exports.comparePassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);
