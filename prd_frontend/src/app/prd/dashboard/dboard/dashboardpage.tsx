'use client'
import React from 'react';
import TopBar from '../topbar';

const DashboardPage: React.FC<{ userRole: string }> = ({ userRole }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TopBar userRole={userRole} />
      {/* Add content for the selected dashboard option */}
    </div>
  );
};

export default DashboardPage;
