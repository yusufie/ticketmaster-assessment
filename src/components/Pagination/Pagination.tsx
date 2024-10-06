"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEventStore } from '@/stores/eventStore';

const PageButtons: React.FC = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, setCurrentPage } = useEventStore();

  React.useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams, setCurrentPage]);

  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`/?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <nav className="flex justify-center py-6">
      <ul className="flex container-shadow">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};


function Pagination() {
  return (
    <Suspense>
      <PageButtons />
    </Suspense>
  );
}
export default Pagination;