import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketLimit from '@/components/TicketLimit/TicketLimit';
import { EventDetails } from '@/lib/types/EventDetails';

// Mock the Icons component
jest.mock('@/lib/icons', () => ({
  Icons: {
    Ticket: () => <svg data-testid="ticket-icon" />,
  },
}));

describe('TicketLimit', () => {
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
    ticketLimit: {
      info: 'Maximum of 4 tickets per person',
    },
  };

  it('renders ticket limit information correctly', () => {
    render(<TicketLimit event_data={mockEventData} />);
    
    expect(screen.getByTestId('ticket-icon')).toBeInTheDocument();
    expect(screen.getByText('Maximum of 4 tickets per person')).toBeInTheDocument();
  });

  it('does not render when ticketLimit is undefined', () => {
    const eventDataWithoutTicketLimit: EventDetails = {
      ...mockEventData,
      ticketLimit: undefined,
    };

    const { container } = render(<TicketLimit event_data={eventDataWithoutTicketLimit} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders an empty paragraph when ticketLimit.info is an empty string', () => {
    const eventDataWithEmptyTicketLimitInfo: EventDetails = {
      ...mockEventData,
      ticketLimit: { info: '' },
    };

    const { container } = render(<TicketLimit event_data={eventDataWithEmptyTicketLimitInfo} />);
    
    expect(container.firstChild).not.toBeNull();
    expect(screen.getByTestId('ticket-icon')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeEmptyDOMElement();
  });

  it('applies correct styling to the component', () => {
    render(<TicketLimit event_data={mockEventData} />);
    
    const containerDiv = screen.getByTestId('ticket-icon').closest('div');
    expect(containerDiv).toHaveClass('flex items-start space-x-2');

    const ticketIcon = screen.getByTestId('ticket-icon');
    expect(ticketIcon).toBeInTheDocument();
  });

  it('renders correctly with HTML content in ticketLimit.info', () => {
    const eventDataWithHtmlTicketLimit: EventDetails = {
      ...mockEventData,
      ticketLimit: {
        info: '<p>Maximum of <strong>4</strong> tickets per person</p>',
      },
    };

    render(<TicketLimit event_data={eventDataWithHtmlTicketLimit} />);
    
    expect(screen.getByText('<p>Maximum of <strong>4</strong> tickets per person</p>')).toBeInTheDocument();
  });
});