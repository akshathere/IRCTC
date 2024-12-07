import  { useState } from 'react';
import { fetchTrains } from '../api/api';

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [search, setSearch] = useState({ source: '', destination: '' });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchTrains(search);
      setTrains(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Error fetching trains');
    }
  };

  return (
    <div>
      <h1>Search Trains</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Source"
          value={search.source}
          onChange={(e) => setSearch({ ...search, source: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destination"
          value={search.destination}
          onChange={(e) => setSearch({ ...search, destination: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            <p>Train Name: {train.name}</p>
            <p>Available Seats: {train.availableSeats}</p>
            <p>Train id: {train.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trains;
