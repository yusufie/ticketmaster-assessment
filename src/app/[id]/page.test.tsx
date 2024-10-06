import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailPage from '@/app/[id]/page';
import { getEvent } from '@/lib/getEvent';
import { EventDetails } from '@/lib/types/EventDetails';
import '@testing-library/jest-dom';

// Mock the getEvent function
jest.mock('@/lib/getEvent', () => ({
  getEvent: jest.fn(),
}));

// Mock the EventDetails component
jest.mock('@/components/EventDetails/EventDetails', () => {
  const EventDetails = ({ event_data }: { event_data: EventDetails | null}) => (
    <div data-testid="event-details">
      {event_data ? `Event: ${event_data.name}` : 'No event data'}
    </div>
  );
  EventDetails.displayName = 'EventDetails';
  return EventDetails;
});

describe('DetailPage', () => {
  const mockEventData = {
    name: 'Test Event',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders EventDetails with event data when eventId is provided', async () => {
    (getEvent as jest.Mock).mockResolvedValueOnce(mockEventData);

    const DetailPageComponent = await DetailPage({ params: { id: 12345 } });
    render(DetailPageComponent);

    expect(screen.getByTestId('event-details')).toHaveTextContent('Event: Test Event');
    expect(getEvent).toHaveBeenCalledWith(12345);
  });

  it('renders EventDetails with no event data when eventId is not provided', async () => {
    const DetailPageComponent = await DetailPage({ params: { id: null } });
    render(DetailPageComponent);

    expect(screen.getByTestId('event-details')).toHaveTextContent('No event data');
    expect(getEvent).not.toHaveBeenCalled();
  });
});