const prisma = require('../models/prismaClient');

exports.bookSeat = async (req, res) => {
  const { trainId, seatCount } = req.body;
  const count=parseInt(seatCount)
  try {
    await prisma.$transaction(async (tx) => {
      // Lock the train record
      const train = await tx.$queryRaw`
        SELECT * FROM "Train" WHERE "id" = ${parseInt(trainId)} FOR UPDATE
      `;

      if (!train.length || train[0].availableSeats < count) {
        throw new Error('Insufficient seats available');
      }

      // Check if the user has already booked for the same train
      const existingBooking = await tx.booking.findFirst({
        where: {
          userId: req.user.id,
          trainId: parseInt(trainId),
        },
      });

      if (existingBooking) {
        // Update the existing booking by incrementing the seatCount
        await tx.booking.update({
          where: { id: existingBooking.id },
          data: { seatCount: { increment: parseInt(count) } },
        });
      } else {
        // Create a new booking
        await tx.booking.create({
          data: {
            user: { connect: { id: req.user.id } },
            train: { connect: { id: parseInt(trainId) } },
            seatCount:count,
          },
        });
      }

      // Update available seats
      await tx.train.update({
        where: { id: parseInt(trainId) },
        data: { availableSeats: { decrement: count } },
      });

      res.json({ message: 'Booking successful' });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getBookingDetails = async (req, res) => {
  const id  = req.user.id; // Extract train ID from the route parameter
  // console.log(trainId)
  try {
    const booking = await prisma.booking.findMany({
      where: { userId: parseInt(id, 10) }, // Use the correct field 'id'
    });

    // Check if train exists
    if (!booking) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return train details
    // res.json({
    //   trainName: train.name,
    //   source: train.source,
    //   destination: train.destination,
    //   seatsAvailable: train.availableSeats,
    // });
    res.json(booking)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
