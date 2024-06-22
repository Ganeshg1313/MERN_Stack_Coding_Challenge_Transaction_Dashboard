// src/pages/Dashboard.js
import React, { useState } from 'react';
import MonthDropdown from '../components/MonthDropdown';
import TransactionTable from '../components/TransactionTable';
import TransactionStatistics from '../components/TransactionStatistics';
import TransactionBarChart from '../components/TransactionBarChart';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <div className="bg-mainBg p-12">
      <div className="flex justify-between mb-10">
      <div className='w-1/3 h-10 bg-white rounded-2xl flex justify-center'>
        <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
      </div>
        <div className='w-1/6'>
          <MonthDropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </div>
      </div>
      <div className="rounded mb-4">
        <TransactionTable />
      </div>
      <div className="bg-yellow-300 rounded mb-4">
        <TransactionStatistics selectedMonth={selectedMonth} />
      </div>
      <div className="rounded mb-4">
        <TransactionBarChart selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default Dashboard;