import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accessibility from '@/components/Accessibility/Accessibility';
import { EventDetails } from '@/lib/types/EventDetails';

// Mock the lucide-react Info component
jest.mock('lucide-react', () => ({
  Info: () => <div data-testid="info-icon" />,
}));

describe('Accessibility', () => {
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
    accessibility: {
      info: 'Wheelchair accessible',
    },
  };

  it('renders accessibility information correctly', () => {
    render(<Accessibility event_data={mockEventData} />);
    
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByText('Wheelchair accessible')).toBeInTheDocument();
  });

  it('does not render when accessibility is undefined', () => {
    const eventDataWithoutAccessibility: EventDetails = {
      ...mockEventData,
      accessibility: undefined,
    };

    const { container } = render(<Accessibility event_data={eventDataWithoutAccessibility} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders an empty paragraph when accessibility.info is an empty string', () => {
    const eventDataWithEmptyAccessibilityInfo: EventDetails = {
      ...mockEventData,
      accessibility: { info: '' },
    };

    const { container } = render(<Accessibility event_data={eventDataWithEmptyAccessibilityInfo} />);
    
    expect(container.firstChild).not.toBeNull();
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeEmptyDOMElement();
  });

  it('applies correct styling to the component', () => {
    const { container } = render(<Accessibility event_data={mockEventData} />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('flex items-start space-x-2');

    // We can't check the icon's classes directly as it's mocked
    // Instead, we'll check if the icon is present
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
  });

  it('renders correctly with HTML content in accessibility.info', () => {
    const eventDataWithHtmlAccessibility: EventDetails = {
      ...mockEventData,
      accessibility: {
        info: '<p>Wheelchair accessible. <strong>Service animals welcome.</strong></p>',
      },
    };

    render(<Accessibility event_data={eventDataWithHtmlAccessibility} />);
    
    expect(screen.getByText('<p>Wheelchair accessible. <strong>Service animals welcome.</strong></p>')).toBeInTheDocument();
  });
});