
import React from 'react';

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search transactions"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full py-2 px-4 rounded-2xl border border-black bg-bgLight focus:outline-none focus:border-blue-500"
    />
  );
};

export default SearchBox;
