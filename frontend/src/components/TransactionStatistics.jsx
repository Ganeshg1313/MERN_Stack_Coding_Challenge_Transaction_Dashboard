// src/components/TransactionStatistics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/statistics', { params: { month: selectedMonth } });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="bg-bgLight rounded p-4 mb-4">
      <h2 className="text-black font-bold mb-2">Transaction Statistics</h2>
      <div className="text-black mb-2">Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div className="text-black mb-2">Total Sold Items: {statistics.totalSoldItems}</div>
      <div className="text-black mb-2">Total Not Sold Items: {statistics.totalNotSoldItems}</div>
    </div>
  );
};

export default TransactionStatistics;
