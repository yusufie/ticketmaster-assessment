"use client";
import React, { useState } from 'react';
import { useEventStore } from '@/stores/eventStore';

const SearchBar: React.FC = () => {
  const [localKeyword, setLocalKeyword] = useState('');
  const { setSearchKeyword } = useEventStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(localKeyword);
  };

  return (
    <form onSubmit={handleSearch} className="flex container-shadow">
      <input
        type="text"
        value={localKeyword}
        onChange={(e) => setLocalKeyword(e.target.value)}
        placeholder="Search events..."
        className="px-4 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-500 w-40 md:w-60"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;