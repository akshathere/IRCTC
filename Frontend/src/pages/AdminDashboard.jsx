import  { useState } from 'react';
import { addTrain } from '../api/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [form, setForm] = useState({ name: '', source: '', destination: '', totalSeats: 0 });
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/'); // Redirect non-admins to User Dashboard
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTrain(form, adminKey);
      alert('Train added successfully');
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding train');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Train Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
        />
        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Admin API Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        />
        <button type="submit">Add Train</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
