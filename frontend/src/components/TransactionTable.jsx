// src/components/TransactionTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBox from './SearchBox';
import Pagination from './Pagination';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (page, perPage, search) => {
    console.log(page, ", ", perPage, ", ", search);
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: {
          page,
          perPage,
          search,
        },
      });

      setTransactions(response.data.transactions);
      console.log(response.data.transactions)
      setCurrentPage(response.data.currentPage);
      setPerPage(response.data.perPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage, perPage, searchQuery);
  }, [perPage, currentPage, searchQuery]);

  return (
    <div className="rounded mb-4">
      <div className="w-1/4 m-3 ml-0">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-bgExtraDark">
            <th className="border-2 border-black px-4 py-2">Title</th>
            <th className="border-2 border-black px-4 py-2">Description</th>
            <th className="border-2 border-black px-4 py-2">Price</th>
            <th className="border-2 border-black px-4 py-2">Category</th>
            <th className="border-2 border-black px-4 py-2">Sold</th>
            <th className="border-2 border-black px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id} className="bg-bgLight">
                <td className="border-2 border-black px-4 py-2">{transaction.title}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.description}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.price}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.category}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="border-2 border-black px-4 py-2">
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="h-16 w-16 object-cover"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border-2 border-black px-4 py-2 text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setCurrentPage} perPage={perPage} />
      </div>
    </div>
  );
};

export default TransactionTable;
