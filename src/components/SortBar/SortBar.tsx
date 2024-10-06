"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEventStore } from '@/stores/eventStore';

const sortOptions = [
  { value: 'relevance,desc', label: 'Relevance (Descending)' },
  { value: 'relevance,asc', label: 'Relevance (Ascending)' },
  { value: 'name,asc', label: 'Name (A-Z)' },
  { value: 'name,desc', label: 'Name (Z-A)' },
  { value: 'date,asc', label: 'Date (Ascending)' },
  { value: 'date,desc', label: 'Date (Descending)' },
  { value: 'venueName,asc', label: 'Venue (A-Z)' },
  { value: 'venueName,desc', label: 'Venue (Z-A)' },
];

const SortSelection: React.FC = () => {

  const { sortOption, setSortOption } = useEventStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const sort = searchParams.get('sort');
    if (sort && sortOptions.some(option => option.value === sort)) {
      setSortOption(sort);
    }
  }, [searchParams, setSortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSortOption);
    params.set('page', '1'); // Reset to first page when changing sort
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center">
      {/* <label htmlFor="sort" className="mr-2">Sort by:</label> */}
      <select
        id="sort"
        value={sortOption}
        onChange={handleSortChange}
        className="px-2 py-[0.375rem] border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-500 container-shadow w-60 md:w-80"
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


function SortBar() {
  return (
    <Suspense>
      <SortSelection />
    </Suspense>
  )
}
export default SortBar;