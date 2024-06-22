// src/components/TransactionTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBox from './SearchBox';
import Pagination from './Pagination';

const TransactionTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (page, search) => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: {
          month: selectedMonth,
          page,
          search
        }
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage, searchQuery);
  }, [selectedMonth, currentPage, searchQuery]);

  return (
    <div>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold}</td>
              <td>
              <img
                src={transaction.image}
                alt={transaction.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
                style={{ width: '100px', height: '100px' }} // Adjust size as needed
              />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
    </div>
  );
};

export default TransactionTable;
