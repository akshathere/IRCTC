const prisma = require('../models/prismaClient');
const { hashPassword } = require('../utils/bcrypt.utils');

// Get details of the currently logged-in user
exports.getUserDetails = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update details of the currently logged-in user
exports.updateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const updates = {};

    if (username) updates.username = username;
    if (password) updates.password = await hashPassword(password);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updates,
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
