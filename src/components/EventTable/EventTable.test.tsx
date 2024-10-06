import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import EventTable from '@/components/EventTable/EventTable';
import { NextImage } from '@/lib/types/NextImage';
import '@testing-library/jest-dom';

// Mock the external dependencies
jest.mock('axios');

// Mock the next/image component
jest.mock('next/image', () => {
  const MockImage = ({ src, alt }: NextImage) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock the event store
jest.mock('@/stores/eventStore', () => ({
  useEventStore: () => ({
    currentPage: 1,
    searchKeyword: '',
    sortOption: '',
    setTotalPages: jest.fn(),
  }),
}));

describe('EventTable', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    queryClient.clear();
  });

  it('renders loading state', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { _embedded: { events: [] }, page: { totalPages: 0 } } });

    render(
      <QueryClientProvider client={queryClient}>
        <EventTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('event-table-skeleton')).toBeInTheDocument();
    });
  });

  it('renders events when data is fetched', async () => {
    const mockEvents = {
      _embedded: {
        events: [
          {
            id: '1',
            name: 'Test Event',
            images: [{ url: 'test.jpg' }],
            priceRanges: [{ min: 10, max: 100 }],
            classifications: [{ segment: { name: 'Music' } }],
            dates: { start: { localDate: '2023-01-01' } },
            url: 'https://test.com',
          },
        ],
      },
      page: { totalPages: 5 },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockEvents });

    render(
      <QueryClientProvider client={queryClient}>
        <EventTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('10 - 100')).toBeInTheDocument();
      expect(screen.getByText('Music')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });
  });

  it('renders error state', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <QueryClientProvider client={queryClient}>
        <EventTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error fetching events')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});