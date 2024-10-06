import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventDetails as EventDetailsType } from '@/lib/types/EventDetails';
import { NextImage } from '@/lib/types/NextImage';
import EventDetails from '@/components/EventDetails/EventDetails';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: NextImage) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} data-testid="next-image" alt={props.alt} />;
  },
}));

describe('EventDetails', () => {
  const mockEventData: EventDetailsType = {
    name: 'Test Event',
    id: 'test-id',
    url: 'https://test-event.com',
    dates: {
      start: {
        localDate: '2023-07-01',
        localTime: '19:00:00',
      },
      timezone: 'America/New_York',
    },
    _embedded: {
      venues: [{
        name: 'Test Venue',
        city: { name: 'Test City' },
        state: { name: 'Test State' },
        country: { name: 'Test Country' },
      }],
      attractions: [{
        name: 'Test Attraction',
        url: 'https://test-attraction.com',
        images: [{
          url: 'https://test-image.com',
          width: 100,
          height: 100,
          ratio: '1:1',
        }],
      }],
    },
    info: 'Test info',
    pleaseNote: 'Test note',
    priceRanges: [{
      type: 'standard',
      currency: 'USD',
      min: 50,
      max: 100,
    }],
    ticketLimit: {
      info: 'Test ticket limit',
    },
    accessibility: {
      info: 'Test accessibility info',
    },
  };

  it('renders the event name', () => {
    render(<EventDetails event_data={mockEventData} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  it('renders all expected sections', () => {
    render(<EventDetails event_data={mockEventData} />);
    
    // Check for the presence of key elements
    expect(screen.getByTestId('next-image')).toBeInTheDocument(); // BestImages
    expect(screen.getByText(/Saturday, July 1, 2023 at 12:00 PM/)).toBeInTheDocument(); // CalendarDate
    expect(screen.getByText('Test Venue')).toBeInTheDocument(); // PinMap
    expect(screen.getByText('Featuring:')).toBeInTheDocument(); // Featuring
    expect(screen.getByText('Test info')).toBeInTheDocument(); // InfoEvent
    expect(screen.getByText('Test note')).toBeInTheDocument(); // PleaseNote
    expect(screen.getByText('Price Ranges:')).toBeInTheDocument(); // PriceRanges
    expect(screen.getByText('Test ticket limit')).toBeInTheDocument(); // TicketLimit
    expect(screen.getByText('Test accessibility info')).toBeInTheDocument(); // Accessibility
    expect(screen.getByText('Buy Tickets')).toBeInTheDocument(); // TicketBuy
  });

  it('renders without crashing when event_data is null', () => {
    render(<EventDetails event_data={null} />);
    const sectionElement = screen.getByTestId('event-details-section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement.tagName).toBe('SECTION');
  });
});