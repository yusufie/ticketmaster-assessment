import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PinMap from '@/components/PinMap/PinMap';
import { EventDetails } from '@/lib/types/EventDetails';

// Mock the Icons component
jest.mock('@/lib/icons', () => ({
  Icons: {
    MapPin: () => <svg data-testid="map-pin-icon" />,
  },
}));

describe('PinMap', () => {
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
      venues: [{
        name: 'Test Venue',
        address: {
          line1: '123 Test Street',
        },
        city: {
          name: 'Test City',
        },
        state: {
          name: 'Test State',
        },
        country: {
          name: 'Test Country',
        },
      }],
    },
  };

  it('renders venue information correctly', () => {
    render(<PinMap event_data={mockEventData} />);
    
    expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    expect(screen.getByText('Test City, Test State, Test Country')).toBeInTheDocument();
  });

  it('handles missing address line gracefully', () => {
    const eventDataWithoutAddress: EventDetails = {
      ...mockEventData,
      _embedded: {
        venues: [{
          ...mockEventData._embedded!.venues![0],
          address: undefined,
        }],
      },
    };

    render(<PinMap event_data={eventDataWithoutAddress} />);
    
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.queryByText('123 Test Street')).not.toBeInTheDocument();
    expect(screen.getByText('Test City, Test State, Test Country')).toBeInTheDocument();
  });

  it('handles missing city and state information gracefully', () => {
    const eventDataWithPartialLocation: EventDetails = {
      ...mockEventData,
      _embedded: {
        venues: [{
          ...mockEventData._embedded!.venues![0],
          city: { name: '' },
          state: { name: '' },
        }],
      },
    };

    render(<PinMap event_data={eventDataWithPartialLocation} />);
    
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    expect(screen.getByText(', , Test Country')).toBeInTheDocument();
  });

  it('renders nothing when no venue information is available', () => {
    const eventDataWithoutVenue: EventDetails = {
      ...mockEventData,
      _embedded: {
        venues: [],
      },
    };

    const { container } = render(<PinMap event_data={eventDataWithoutVenue} />);
    
    expect(container.firstChild).toBeNull();
  });
});