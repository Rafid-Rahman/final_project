'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import 'tailwindcss/tailwind.css';


const SignupPage: React.FC = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    gender: '',
    age: 0,
    role: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/prd/auth/signup', formData);
      router.push('http://localhost:3001/prd/auth/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Signup Page</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg text-black">
          <label className="block mb-4">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block mb-4">
  Username:
  <input
    type="text"
    name="username"
    value={formData.username}
    onChange={handleChange}
    required
    className="border rounded p-2 w-full"
  />
</label>
<label className="block mb-4">
  Gender:
  <input
    type="text"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
    className="border rounded p-2 w-full"
  />
</label>
<label className="block mb-4">
  Age:
  <input
    type="number"
    name="age"
    value={formData.age}
    onChange={handleChange}
    required
    className="border rounded p-2 w-full"
  />
</label>
<label className="block mb-4">
  Role:
  <input
    type="text"
    name="role"
    value={formData.role}
    onChange={handleChange}
    required
    className="border rounded p-2 w-full"
  />
</label>
<label className="block mb-4">
  Phone:
  <input
    type="text"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    required
    className="border rounded p-2 w-full"
  />
</label>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );};

export default SignupPage;
