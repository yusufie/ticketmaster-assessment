import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/Pagination/Pagination';
import * as eventStoreModule from '@/stores/eventStore';
import { useRouter, useSearchParams } from 'next/navigation';

// Define the type for our mock store
type MockStore = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

// Mock the useRouter and useSearchParams hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
    toString: jest.fn(),
  })),
}));

// Create a mock for the entire eventStore module
jest.mock('@/stores/eventStore', () => ({
  useEventStore: jest.fn(),
}));

describe('Pagination', () => {
  // Create a type-safe mock function for setCurrentPage
  const mockSetCurrentPage = jest.fn();
  let mockPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      toString: jest.fn(),
    });
  });

  const setupEventStore = (currentPage: number, totalPages: number) => {
    ((eventStoreModule.useEventStore as unknown) as jest.MockedFunction<() => MockStore>).mockReturnValue({
      currentPage,
      totalPages,
      setCurrentPage: mockSetCurrentPage,
    });
  };

  it('renders correctly with current page in the middle', () => {
    setupEventStore(3, 5);

    render(<Pagination />);
    
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    setupEventStore(1, 5);

    render(<Pagination />);
    
    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('disables Next button on last page', () => {
    setupEventStore(5, 5);

    render(<Pagination />);
    
    expect(screen.getByText('Prev')).not.toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls setCurrentPage and updates URL when a page number is clicked', () => {
    setupEventStore(3, 5);
  
    render(<Pagination />);
    
    fireEvent.click(screen.getByText('4'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=4'), { scroll: false });
  });

  it('calls setCurrentPage and updates URL when Next is clicked', () => {
    setupEventStore(3, 5);
  
    render(<Pagination />);
    
    fireEvent.click(screen.getByText('Next'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=4'), { scroll: false });
  });

  it('calls setCurrentPage and updates URL when Prev is clicked', () => {
    setupEventStore(3, 5);
  
    render(<Pagination />);
    
    fireEvent.click(screen.getByText('Prev'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'), { scroll: false });
  });

  it('sets initial page from URL', () => {
    setupEventStore(1, 5);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('3'),
      toString: jest.fn(),
    });
  
    render(<Pagination />);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('applies correct styles to current page button', () => {
    setupEventStore(3, 5);

    render(<Pagination />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-blue-500 text-white');
    
    const otherPageButton = screen.getByText('2');
    expect(otherPageButton).toHaveClass('bg-gray-200 text-gray-700');
  });
});