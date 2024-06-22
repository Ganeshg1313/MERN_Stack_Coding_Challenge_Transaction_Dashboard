// src/pages/Dashboard.js
import React, { useState } from 'react';
import MonthDropdown from '../components/MonthDropdown';
import TransactionTable from '../components/TransactionTable';
import TransactionStatistics from '../components/TransactionStatistics';
import TransactionBarChart from '../components/TransactionBarChart';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <div>
      <h1>Dashboard</h1>
      <MonthDropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <TransactionTable selectedMonth={selectedMonth} />
      <TransactionStatistics selectedMonth={selectedMonth} />
      <TransactionBarChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default Dashboard;
