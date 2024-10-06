import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/Pagination/Pagination';
import * as eventStoreModule from '@/stores/eventStore';

// Define the type for our mock store
type MockStore = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

// Create a mock for the entire eventStore module
jest.mock('@/stores/eventStore', () => ({
  useEventStore: jest.fn(),
}));

describe('Pagination', () => {
  // Create a type-safe mock function for setCurrentPage
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('calls setCurrentPage when a page number is clicked', () => {
    setupEventStore(3, 5);

    render(<Pagination />);
    
    fireEvent.click(screen.getByText('4'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
  });

  it('calls setCurrentPage when Next is clicked', () => {
    setupEventStore(3, 5);

    render(<Pagination />);
    
    fireEvent.click(screen.getByText('Next'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
  });

  it('calls setCurrentPage when Prev is clicked', () => {
    setupEventStore(3, 5);

    render(<Pagination />);
    
    fireEvent.click(screen.getByText('Prev'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
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