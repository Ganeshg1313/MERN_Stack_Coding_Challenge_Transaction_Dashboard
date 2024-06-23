
import React from 'react';

const MonthDropdown = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="w-full bg-bgDark rounded-xl p-2"
    >
      {months.map((month) => (
        <option key={month} value={month}>{month}</option>
      ))}
    </select>
  );
};

export default MonthDropdown;
