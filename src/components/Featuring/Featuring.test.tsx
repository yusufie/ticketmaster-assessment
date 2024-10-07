import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Featuring from '@/components/Featuring/Featuring';
import { EventDetails, Attraction } from '@/lib/types/EventDetails';

// Mock the Icons component
jest.mock('@/lib/icons', () => ({
  Icons: {
    Ticket: () => <svg data-testid="ticket-icon" />,
  },
}));

// Mock the Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'Link';
  return MockLink;
});

describe('Featuring', () => {
  const mockAttraction: Attraction = {
    name: 'Attraction 1',
    url: 'https://attraction1.com',
    images: [{ url: 'https://example.com/image.jpg', width: 100, height: 100, ratio: '1:1' }],
  };

  const mockEventData: EventDetails = {
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
      attractions: [
        mockAttraction,
        { ...mockAttraction, name: 'Attraction 2', url: 'https://attraction2.com' },
      ],
    },
  };

  it('renders multiple attractions correctly', () => {
    render(<Featuring event_data={mockEventData} />);
    
    expect(screen.getByTestId('ticket-icon')).toBeInTheDocument();
    expect(screen.getByText('Featuring:')).toBeInTheDocument();
    expect(screen.getByText('Attraction 1')).toBeInTheDocument();
    expect(screen.getByText('Attraction 2')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://attraction1.com');
    expect(links[1]).toHaveAttribute('href', 'https://attraction2.com');
  });

  it('renders a single attraction correctly', () => {
    const singleAttractionData: EventDetails = {
      ...mockEventData,
      _embedded: {
        attractions: [{ ...mockAttraction, name: 'Single Attraction', url: 'https://single-attraction.com' }],
      },
    };

    render(<Featuring event_data={singleAttractionData} />);
    
    expect(screen.getByText('Featuring:')).toBeInTheDocument();
    expect(screen.getByText('Single Attraction')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://single-attraction.com');
  });

  it('handles missing attraction URL gracefully', () => {
    const missingUrlData: EventDetails = {
      ...mockEventData,
      _embedded: {
        attractions: [{ ...mockAttraction, name: 'No URL Attraction', url: '' }],
      },
    };

    render(<Featuring event_data={missingUrlData} />);
    
    expect(screen.getByText('No URL Attraction')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '#');
  });

  it('renders nothing when no attractions are available', () => {
    const noAttractionsData: EventDetails = {
      ...mockEventData,
      _embedded: {
        attractions: [],
      },
    };

    const { container } = render(<Featuring event_data={noAttractionsData} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when _embedded or attractions are undefined', () => {
    const noEmbeddedData: EventDetails = {
      ...mockEventData,
      _embedded: undefined,
    };

    const { container } = render(<Featuring event_data={noEmbeddedData} />);
    
    expect(container.firstChild).toBeNull();
  });
});