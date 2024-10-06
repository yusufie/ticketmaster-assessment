import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/SearchBar/SearchBar';
import * as eventStoreModule from '@/stores/eventStore';

// Define the type for our mock store
type MockStore = {
  setSearchKeyword: (keyword: string) => void;
};

// Create a mock for the entire eventStore module
jest.mock('@/stores/eventStore', () => ({
  useEventStore: jest.fn(),
}));

describe('SearchBar', () => {
  const mockSetSearchKeyword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    ((eventStoreModule.useEventStore as unknown) as jest.MockedFunction<() => MockStore>).mockReturnValue({
      setSearchKeyword: mockSetSearchKeyword,
    });
  });

  it('renders correctly', () => {
    render(<SearchBar />);
    
    expect(screen.getByPlaceholderText('Search events...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search events...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test event' } });
    
    expect(input.value).toBe('test event');
  });

  it('calls setSearchKeyword and prevents default on form submission', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search events...') as HTMLInputElement;
    const form = screen.getByTestId('search-form');
    
    fireEvent.change(input, { target: { value: 'test event' } });
    
    // Mock window.location.reload
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    fireEvent.submit(form);
    
    expect(mockSetSearchKeyword).toHaveBeenCalledWith('test event');
    expect(mockReload).not.toHaveBeenCalled();
  });

  it('applies correct styles to input and button', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search events...');
    const button = screen.getByRole('button', { name: 'Search' });
    
    expect(input).toHaveClass('px-4 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-500 w-40 md:w-60');
    expect(button).toHaveClass('px-4 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500');
  });
});