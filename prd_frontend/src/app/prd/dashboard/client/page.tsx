'use client'
import React from 'react';
import TopBar from '../topbar';

const EstimatorDashboard: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold p-4 bg-blue-500 text-white">Client Dashboard</h1>
      <h1>Client Dashboard</h1>
      <TopBar userRole="Client" />
    </div>
  );
};

export default EstimatorDashboard;
