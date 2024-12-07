import  { useState } from 'react';
import { bookSeat, getBookingDetails } from '../api/api';

const Bookings = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [trainId, setTrainId] = useState('');
  const [seatCount, setSeatCount] = useState(1);

  const handleBooking = async () => {
    try {
      const response = await bookSeat({ trainId, seatCount });
      alert('Booking successful: ' + response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || 'Error booking seat');
    }
  };

  const handleGetDetails = async () => {
    try {
      const response = await getBookingDetails(bookingId);
      setBookingDetails(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Error fetching booking details');
    }
  };

  return (
    <div>
      <h1>Book a Seat</h1>
      <input
        type="text"
        placeholder="Train ID"
        value={trainId}
        onChange={(e) => setTrainId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Seat Count"
        value={seatCount}
        onChange={(e) => setSeatCount(e.target.value)}
      />
      <button onClick={handleBooking}>Book Seat</button>

      <h2>Get Booking Details</h2>
      <input
        type="text"
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />
      <button onClick={handleGetDetails}>Get Details</button>

      {bookingDetails && (
        <div>
          <h3>Booking Information</h3>
          <p>{JSON.stringify(bookingDetails)}</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
