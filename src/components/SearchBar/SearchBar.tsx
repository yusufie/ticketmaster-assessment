"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEventStore } from '@/stores/eventStore';

const SearchBar: React.FC = () => {
  
  const [localKeyword, setLocalKeyword] = useState('');
  const { setSearchKeyword } = useEventStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      setLocalKeyword(keyword);
      setSearchKeyword(keyword);
    }
  }, [searchParams, setSearchKeyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(localKeyword);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('keyword', localKeyword);
    params.set('page', '1'); // Reset to first page when searching
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch} className="flex container-shadow" data-testid="search-form">
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