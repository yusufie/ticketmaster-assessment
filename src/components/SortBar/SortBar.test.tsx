import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortBar from '@/components/SortBar/SortBar';
import * as eventStoreModule from '@/stores/eventStore';
import { useRouter, useSearchParams } from 'next/navigation';

// Define the type for our mock store
type MockStore = {
  sortOption: string;
  setSortOption: (option: string) => void;
};

// Mock the useRouter and useSearchParams hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Create a mock for the entire eventStore module
jest.mock('@/stores/eventStore', () => ({
  useEventStore: jest.fn(),
}));

describe('SortBar', () => {
  const mockSetSortOption = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    ((eventStoreModule.useEventStore as unknown) as jest.MockedFunction<() => MockStore>).mockReturnValue({
      sortOption: 'relevance,desc',
      setSortOption: mockSetSortOption,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('renders correctly with all sort options', () => {
    render(<SortBar />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(8); // Assuming 8 sort options as in the component

    expect(screen.getByText('Relevance (Descending)')).toBeInTheDocument();
    expect(screen.getByText('Name (A-Z)')).toBeInTheDocument();
    expect(screen.getByText('Date (Ascending)')).toBeInTheDocument();
    expect(screen.getByText('Venue (Z-A)')).toBeInTheDocument();
  });

  it('selects the correct default option', () => {
    render(<SortBar />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('relevance,desc');
  });

  it('calls setSortOption when a new option is selected', () => {
    render(<SortBar />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name,asc' } });

    expect(mockSetSortOption).toHaveBeenCalledWith('name,asc');
  });

  it('updates URL when sort option changes', () => {
    render(<SortBar />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name,asc' } });
  
    expect(mockSetSortOption).toHaveBeenCalledWith('name,asc');
    expect(mockPush).toHaveBeenCalledWith('/?sort=name%2Casc&page=1', { scroll: false });
  });

  it('applies correct styles to the select element', () => {
    render(<SortBar />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('px-2 py-[0.375rem] border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-500 container-shadow w-60 md:w-80');
  });
});