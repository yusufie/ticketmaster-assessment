import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalenderDate from '@/components/CalenderDate/CalenderDate';
import { EventDetails } from '@/lib/types/EventDetails';

// Mock the lucide-react CalendarDays component
jest.mock('lucide-react', () => ({
  CalendarDays: () => <div data-testid="calendar-icon" />,
}));

describe('CalenderDate', () => {
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
  };

  it('renders the date and time correctly', () => {
    render(<CalenderDate event_data={mockEventData} />);
    
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByText('Saturday, July 1, 2023 at 12:00 PM')).toBeInTheDocument();
  });

  it('handles different timezones correctly', () => {
    const eventDataWithDifferentTimezone: EventDetails = {
      ...mockEventData,
      dates: {
        start: {
          localDate: mockEventData?.dates?.start?.localDate || '',
          localTime: mockEventData?.dates?.start?.localTime || '',
        },
        timezone: 'Europe/London',
      },
    };

    render(<CalenderDate event_data={eventDataWithDifferentTimezone} />);
    
    expect(screen.getByText('Saturday, July 1, 2023 at 5:00 PM')).toBeInTheDocument();
  });

  it('handles missing date data gracefully', () => {
    const eventDataWithMissingDate: EventDetails = {
      name: 'Test Event',
      id: 'test-id',
      url: 'https://test-event.com',
      dates: {
        start: {
          localDate: '',
          localTime: '',
        },
        timezone: '',
      },
    };

    render(<CalenderDate event_data={eventDataWithMissingDate} />);
    
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByText('Invalid Date')).toBeInTheDocument();
  });

  it('handles missing time data gracefully', () => {
    const eventDataWithMissingTime: EventDetails = {
      ...mockEventData,
      dates: {
        start: {
          localDate: '2023-07-01',
          localTime: '',
        },
        timezone: 'America/New_York',
      },
    };

    render(<CalenderDate event_data={eventDataWithMissingTime} />);
    
    expect(screen.getByText('Invalid Date')).toBeInTheDocument();
  });
});