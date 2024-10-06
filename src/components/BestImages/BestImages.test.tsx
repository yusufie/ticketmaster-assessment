import React from 'react';
import { render, screen } from '@testing-library/react';
import BestImages from '@/components/BestImages/BestImages';
import { EventDetails } from '@/lib/types/EventDetails';
import { NextImage } from '@/lib/types/NextImage';
import { NextLink } from '@/lib/types/NextLink';
import '@testing-library/jest-dom';


// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: NextImage) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} data-testid="next-image" alt={props.alt} />;
  },
}));

jest.mock('next/link', () => ({
   __esModule: true,
   default: ({ children, href }: NextLink) => (
     <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
 }));

describe('BestImages', () => {
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
        {
          name: 'Attraction 1',
          url: 'https://test-attraction1.com',
          images: [
            { url: 'image1_3_2.jpg', width: 300, height: 200, ratio: '3_2' },
            { url: 'image1_16_9.jpg', width: 1600, height: 900, ratio: '16_9' },
          ],
        },
        {
          name: 'Attraction 2',
          url: 'https://test-attraction2.com',
          images: [
            { url: 'image2_16_9.jpg', width: 1600, height: 900, ratio: '16_9' },
          ],
        },
      ],
    },
  };

  it('renders attractions with images and links', () => {
    render(<BestImages event_data={mockEventData} />);
    
    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);
    
    const links = screen.getAllByTestId('next-link');
    expect(links).toHaveLength(2);
    
    expect(screen.getByText('Attraction 1')).toBeInTheDocument();
    expect(screen.getByText('Attraction 2')).toBeInTheDocument();
  });

  it('links to correct URLs', () => {
    render(<BestImages event_data={mockEventData} />);
    
    const links = screen.getAllByTestId('next-link');
    expect(links[0]).toHaveAttribute('href', 'https://test-attraction1.com');
    expect(links[1]).toHaveAttribute('href', 'https://test-attraction2.com');
  });

  it('prefers 3_2 ratio images when available', () => {
    render(<BestImages event_data={mockEventData} />);
    
    const images = screen.getAllByTestId('next-image');
    expect(images[0]).toHaveAttribute('src', 'image1_3_2.jpg');
  });

  it('falls back to 16_9 ratio images when 3_2 is not available', () => {
    render(<BestImages event_data={mockEventData} />);
    
    const images = screen.getAllByTestId('next-image');
    expect(images[1]).toHaveAttribute('src', 'image2_16_9.jpg');
  });

  it('renders nothing when there are no attractions', () => {
    const noAttractionsEventData = { ...mockEventData, _embedded: { attractions: [] } };
    const { container } = render(<BestImages event_data={noAttractionsEventData} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles missing image data gracefully', () => {
    const missingImageEventData = {
      ...mockEventData,
      _embedded: {
        attractions: [
          {
            name: 'Attraction with no images',
            url: 'https://test-attraction.com',
            images: [],
          },
        ],
      },
    };
    render(<BestImages event_data={missingImageEventData} />);
    
    expect(screen.getByText('Attraction with no images')).toBeInTheDocument();
    expect(screen.getByText('No image available')).toBeInTheDocument();
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next-link')).not.toBeInTheDocument();
  });

  it('uses "#" as href when attraction URL is missing', () => {
    const missingUrlEventData = {
      ...mockEventData,
      _embedded: {
        attractions: [
          {
            name: 'Attraction with no URL',
            images: [{ url: 'image.jpg', width: 300, height: 200, ratio: '3_2' }],
          },
        ],
      },
    };
    render(<BestImages event_data={missingUrlEventData} />);
    
    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '#');
  });

});