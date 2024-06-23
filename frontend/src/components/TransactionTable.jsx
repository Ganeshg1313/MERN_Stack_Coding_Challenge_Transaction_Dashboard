// src/components/TransactionTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBox from './SearchBox';
import Pagination from './Pagination';
import apiUrl from '../conf/conf'

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (page, perPage, search) => {
    try {
      const response = await axios.get(`${apiUrl}/api/transactions`, {
        params: {
          page,
          perPage,
          search,
        },
      });

      setTransactions(response.data.transactions);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="rounded mb-4">
      <div className="w-1/4 m-3 ml-0">
        <SearchBox searchQuery={searchQuery} setSearchQuery={handleSearch} />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-bgExtraDark">
            <th className="border-2 border-black px-4 py-2 rounded-tl-lg">id</th>
            <th className="border-2 border-black px-4 py-2">Title</th>
            <th className="border-2 border-black px-4 py-2">Description</th>
            <th className="border-2 border-black px-4 py-2">Price</th>
            <th className="border-2 border-black px-4 py-2">Category</th>
            <th className="border-2 border-black px-4 py-2">Sold</th>
            <th className="border-2 border-black px-4 py-2 rounded-tr-lg">Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={transaction._id} className="bg-bgLight">
                <td className={`border-2 border-black px-4 py-2 ${index === transactions.length - 1 ? 'rounded-bl-lg' : ''}`}>{transaction.id}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.title}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.description}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.price.toFixed(2)}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.category}</td>
                <td className="border-2 border-black px-4 py-2">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className={`border-2 border-black px-4 py-2 ${index === transactions.length - 1 ? 'rounded-br-lg' : ''}`}>
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
              <td colSpan="7" className="border-2 border-black px-4 py-2 text-center">
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
