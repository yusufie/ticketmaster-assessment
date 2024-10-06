import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceRanges from '@/components/PriceRanges/PriceRanges';
import { EventDetails, PriceRange } from '@/lib/types/EventDetails';

// Mock the lucide-react DollarSign component
jest.mock('lucide-react', () => ({
  DollarSign: () => <div data-testid="dollar-sign-icon" />,
}));

describe('PriceRanges', () => {
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
    priceRanges: [
      { type: 'standard', currency: 'USD', min: 50, max: 100 },
      { type: 'vip', currency: 'USD', min: 150, max: 200 },
    ],
  };

  it('renders price ranges correctly', () => {
    render(<PriceRanges event_data={mockEventData} />);
    
    expect(screen.getByTestId('dollar-sign-icon')).toBeInTheDocument();
    expect(screen.getByText('Price Ranges:')).toBeInTheDocument();
    expect(screen.getByText('standard: USD 50.00 - 100.00')).toBeInTheDocument();
    expect(screen.getByText('vip: USD 150.00 - 200.00')).toBeInTheDocument();
  });

  it('renders a single price range correctly', () => {
    const singlePriceRangeData: EventDetails = {
      ...mockEventData,
      priceRanges: [{ type: 'standard', currency: 'EUR', min: 40, max: 80 }],
    };

    render(<PriceRanges event_data={singlePriceRangeData} />);
    
    expect(screen.getByText('Price Ranges:')).toBeInTheDocument();
    expect(screen.getByText('standard: EUR 40.00 - 80.00')).toBeInTheDocument();
  });

  it('does not render when priceRanges is undefined', () => {
    const eventDataWithoutPriceRanges: EventDetails = {
      ...mockEventData,
      priceRanges: undefined,
    };

    const { container } = render(<PriceRanges event_data={eventDataWithoutPriceRanges} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when priceRanges is an empty array', () => {
    const eventDataWithEmptyPriceRanges: EventDetails = {
      ...mockEventData,
      priceRanges: [],
    };

    const { container } = render(<PriceRanges event_data={eventDataWithEmptyPriceRanges} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('handles potentially missing min or max values gracefully', () => {
    const eventDataWithPotentiallyPartialPriceRange: EventDetails = {
      ...mockEventData,
      priceRanges: [
        { type: 'partial', currency: 'USD', min: 50, max: 50 } as PriceRange,
        { type: 'another-partial', currency: 'USD', min: 100, max: 100 } as PriceRange,
      ],
    };

    render(<PriceRanges event_data={eventDataWithPotentiallyPartialPriceRange} />);
    
    expect(screen.getByText('partial: USD 50.00 - 50.00')).toBeInTheDocument();
    expect(screen.getByText('another-partial: USD 100.00 - 100.00')).toBeInTheDocument();
  });

  it('applies correct styling to the component', () => {
    const { container } = render(<PriceRanges event_data={mockEventData} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('flex items-start space-x-2');

    const priceRangesTitle = screen.getByText('Price Ranges:');
    expect(priceRangesTitle).toHaveClass('font-semibold');
  });
});