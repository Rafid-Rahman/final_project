'use client'
import React from 'react';
import TopBar from '../topbar';

const EstimatorDashboard: React.FC = () => {
  return (
    <div>
      <h1>Estimator Dashboard</h1>
      <TopBar userRole="Estimator" />
    </div>
  );
};

export default EstimatorDashboard;
