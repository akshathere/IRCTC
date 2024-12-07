const prisma = require('../models/prismaClient');

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;

  try {
    let seat=parseInt(totalSeats)
    const train = await prisma.train.create({
      data: { name, source, destination, totalSeats:seat , availableSeats: seat },
    });
    res.json({ message: 'Train added successfully!', train });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTrains = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const trains = await prisma.train.findMany({
      where: { source, destination },
    });
    res.json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
