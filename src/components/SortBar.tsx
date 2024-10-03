"use client";
import React from 'react';
import { useEventStore } from '@/stores/eventStore';

const sortOptions = [
  { value: 'relevance,desc', label: 'Relevance' },
  { value: 'name,asc', label: 'Name (A-Z)' },
  { value: 'name,desc', label: 'Name (Z-A)' },
  { value: 'date,asc', label: 'Date (Ascending)' },
  { value: 'date,desc', label: 'Date (Descending)' },
  { value: 'venueName,asc', label: 'Venue (A-Z)' },
  { value: 'venueName,desc', label: 'Venue (Z-A)' },
];

const SortBar: React.FC = () => {
  const { sortOption, setSortOption } = useEventStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={handleSortChange}
        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-500"
      >
        {sortOptions?.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBar;