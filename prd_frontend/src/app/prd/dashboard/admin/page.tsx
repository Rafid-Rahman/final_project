'use client'
import React from 'react';
import TopBar from '../topbar';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold p-4 bg-blue-500 text-white">Admin Dashboard</h1>
      <TopBar userRole="Admin" />
  
      <ul className="p-4">
        <li>
          <Link href="http://localhost:3001/prd/dashboard/employee_list" className="text-blue-500 hover:underline">
            Employee List
          </Link>
        </li>
      </ul>
    </div>
  );
  
};

export default AdminDashboard;
