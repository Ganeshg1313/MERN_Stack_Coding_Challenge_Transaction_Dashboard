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
    <div className="bg-bgLight rounded-3xl p-6 mb-4">
      <div className='w/full flex justify-between'>
        <div className="text-black mb-2 font-semibold">Total Sale Amount</div>
        <div>{statistics.totalSaleAmount}</div>
      </div>
      <div className='w/full flex justify-between font-semibold'>
        <div className="text-black mb-2">Total Sold Items</div>
        <div>{statistics.totalSoldItems}</div>
      </div>
      <div className='w/full flex justify-between font-semibold'>
        <div className="text-black mb-2">Total Not Sold Items</div>
        <div>{statistics.totalNotSoldItems}</div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
