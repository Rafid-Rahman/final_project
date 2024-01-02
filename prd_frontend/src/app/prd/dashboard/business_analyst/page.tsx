'use client'
import React from 'react';
import TopBar from '../topbar';

const BusinessAnalystDashboard: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
    <h1 className="text-3xl font-bold p-4 bg-blue-500 text-white">Business Analyst Dashboard</h1>
      <TopBar userRole="Business Analyst" />
    </div>
  );
};

export default BusinessAnalystDashboard;
