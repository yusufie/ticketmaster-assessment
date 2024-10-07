import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoEvent from '@/components/InfoEvent/InfoEvent';
import { EventDetails } from '@/lib/types/EventDetails';

// Mock the Icons component
jest.mock('@/lib/icons', () => ({
  Icons: {
    Info: () => <svg data-testid="info-icon" />,
  },
}));

describe('InfoEvent', () => {
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
    info: 'This is a test event with important information.',
  };

  it('renders event information correctly', () => {
    render(<InfoEvent event_data={mockEventData} />);
    
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByText('This is a test event with important information.')).toBeInTheDocument();
  });

  it('does not render when event_data is null', () => {
    const { container } = render(<InfoEvent event_data={null} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when info is undefined', () => {
    const eventDataWithoutInfo: EventDetails = {
      ...mockEventData,
      info: undefined,
    };

    const { container } = render(<InfoEvent event_data={eventDataWithoutInfo} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when info is an empty string', () => {
    const eventDataWithEmptyInfo: EventDetails = {
      ...mockEventData,
      info: '',
    };

    const { container } = render(<InfoEvent event_data={eventDataWithEmptyInfo} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with HTML content in info', () => {
    const eventDataWithHtmlInfo: EventDetails = {
      ...mockEventData,
      info: '<p>This is <strong>HTML</strong> content</p>',
    };

    render(<InfoEvent event_data={eventDataWithHtmlInfo} />);
    
    expect(screen.getByText('<p>This is <strong>HTML</strong> content</p>')).toBeInTheDocument();
  });
});