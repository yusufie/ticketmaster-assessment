import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketBuy from '@/components/TicketBuy/TicketBuy';
import { EventDetails } from '@/lib/types/EventDetails';
import { NextLink } from '@/lib/types/NextLink';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, ...rest }: NextLink) => {
    return <a {...rest}>{children}</a>;
  };
  MockLink.displayName = 'Link';
  return MockLink;
});

// Mock the lucide-react ExternalLink component
jest.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe('TicketBuy', () => {
  const mockEventData: EventDetails = {
    name: 'Test Event',
    id: 'test-id',
    url: 'https://test-event.com/buy-tickets',
    dates: {
      start: {
        localDate: '2023-07-01',
        localTime: '19:00:00',
      },
      timezone: 'America/New_York',
    },
  };

  it('renders the Buy Tickets link correctly', () => {
    render(<TicketBuy event_data={mockEventData} />);
    
    const link = screen.getByRole('link', { name: /Buy Tickets/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://test-event.com/buy-tickets');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the external link icon', () => {
    render(<TicketBuy event_data={mockEventData} />);
    
    expect(screen.getByTestId('external-link-icon')).toBeInTheDocument();
  });

  it('uses # as fallback URL when event_data.url is undefined', () => {
    const eventDataWithoutUrl: EventDetails = {
      ...mockEventData,
      url: undefined,
    };

    render(<TicketBuy event_data={eventDataWithoutUrl} />);
    
    const link = screen.getByRole('link', { name: /Buy Tickets/i });
    expect(link).toHaveAttribute('href', '#');
  });

  it('applies correct styling to the component', () => {
    render(<TicketBuy event_data={mockEventData} />);
    
    const link = screen.getByRole('link', { name: /Buy Tickets/i });
    expect(link).toHaveClass('mt-4 inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors');
  });

  it('renders correctly when event_data is null', () => {
    render(<TicketBuy event_data={null} />);
    
    const link = screen.getByRole('link', { name: /Buy Tickets/i });
    expect(link).toHaveAttribute('href', '#');
  });
});