import  { useState } from 'react';
import { loginUser } from '../api/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      saveToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      alert('Login successful');
      console.log(response.data.role)
      if (response.data.role =='admin') {
        navigate('/admin'); // Admin Dashboard
      } else {
        navigate('/'); // Regular User Dashboard
      }
    } catch (error) {
      alert(error.response.data.error || 'Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
