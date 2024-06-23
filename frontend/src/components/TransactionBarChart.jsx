// src/components/TransactionBarChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import apiUrl from '../conf/conf'

const TransactionBarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/barChart`, { params: { month: selectedMonth } });
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  return (
    <BarChart
      width={600}
      height={300}
      data={barChartData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#4cc9f0" />
    </BarChart>
  );
};

export default TransactionBarChart;
