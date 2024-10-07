import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PleaseNote from '@/components/PleaseNote/PleaseNote';
import { EventDetails } from '@/lib/types/EventDetails';

// Mock the Icons component
jest.mock('@/lib/icons', () => ({
  Icons: {
    AlertCircle: () => <svg data-testid="alert-circle-icon" />,
  },
}));

describe('PleaseNote', () => {
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
    pleaseNote: 'Please note: This is important information about the event.',
  };

  it('renders "please note" information correctly', () => {
    render(<PleaseNote event_data={mockEventData} />);
    
    expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
    expect(screen.getByText('Please note: This is important information about the event.')).toBeInTheDocument();
  });

  it('applies correct styling to the component', () => {
    render(<PleaseNote event_data={mockEventData} />);
    
    const containerDiv = screen.getByTestId('alert-circle-icon').closest('div');
    expect(containerDiv).toHaveClass('flex items-start space-x-2');

    const icon = screen.getByTestId('alert-circle-icon');
    expect(icon).toBeInTheDocument();

    const text = screen.getByText('Please note: This is important information about the event.');
    expect(text).toHaveClass('text-red-500');
  });

  it('does not render when event_data is null', () => {
    const { container } = render(<PleaseNote event_data={null} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when pleaseNote is undefined', () => {
    const eventDataWithoutPleaseNote: EventDetails = {
      ...mockEventData,
      pleaseNote: undefined,
    };

    const { container } = render(<PleaseNote event_data={eventDataWithoutPleaseNote} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when pleaseNote is an empty string', () => {
    const eventDataWithEmptyPleaseNote: EventDetails = {
      ...mockEventData,
      pleaseNote: '',
    };

    const { container } = render(<PleaseNote event_data={eventDataWithEmptyPleaseNote} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with HTML content in pleaseNote', () => {
    const eventDataWithHtmlPleaseNote: EventDetails = {
      ...mockEventData,
      pleaseNote: '<p>This is <strong>HTML</strong> content</p>',
    };

    render(<PleaseNote event_data={eventDataWithHtmlPleaseNote} />);
    
    expect(screen.getByText('<p>This is <strong>HTML</strong> content</p>')).toBeInTheDocument();
  });
});