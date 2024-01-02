"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import 'tailwindcss/tailwind.css';


const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/prd/auth/login', formData);

      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userRole', response.data.role);

      switch (response.data.role) {
        case 'Admin':
          router.push('http://localhost:3001/prd/dashboard/admin');
          break;
        case 'Business Analyst':
          router.push('http://localhost:3001/prd/dashboard/business_analyst');
          break;
        case 'Estimator':
          router.push('http://localhost:3001/prd/dashboard/estimator');
          break;
        case 'Client':
          router.push('http://localhost:3001/prd/dashboard/client');
          break;
        default:
          console.log('Unexpected role:', response.data.role);
          router.push('/prd/dashboard/default');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="border p-2 rounded mt-1"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-800">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="border p-2 rounded mt-1"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="role" className="text-sm font-medium text-gray-800">
              Role:
            </label>
            <input
              type="text"
              name="role"
              onChange={handleChange}
              className="border p-2 rounded mt-1"
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
  
          <p className="mt-4 text-center text-gray-800">
            Don't have an account?{' '}
            <a href="http://localhost:3001/prd/auth/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
  
};

export default LoginPage;
