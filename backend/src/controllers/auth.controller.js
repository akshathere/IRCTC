const prisma = require('../models/prismaClient');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateToken } = require('../utils/jwt.utils');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/env');
exports.registerUser = async (req, res) => {
  const { username, password, role, adminKey } = req.body;
  const ADMIN_PRIVATE_KEY = process.env.ADMIN_API_KEY; // Store your admin key securely in environment variables

  try {
    console.log(req.body);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already registered with this username.' });
    }

    // Check if the role is "admin"
    if (role === 'admin') {
      // Verify the provided admin key
      console.log(adminKey)
      console.log(ADMIN_PRIVATE_KEY)
      if (!adminKey || adminKey !== ADMIN_PRIVATE_KEY) {
        return res.status(403).json({ error: 'Invalid admin key. You cannot register as an admin.' });
      }
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role },
    });

    res.json({ message: `${user.role} registered successfully!`, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token with user details
    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' } // Token valid for 1 hour
    );

    res.json({
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
