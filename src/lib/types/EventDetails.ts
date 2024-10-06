
export interface Venue {
  name: string;
  city: { name: string };
  state: { name: string };
  country: { name: string };
  address?: { line1: string };
}

export interface Attraction {
  name: string;
  url?: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    ratio: string;
  }>;
}

export interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

export interface EventDetails {
  name: string;
  id: string;
  url?: string;
  dates?: {
    start: {
      localDate: string;
      localTime: string;
    };
    timezone: string;
  };
  _embedded?: {
    venues?: Venue[];
    attractions?: Attraction[];
  };
  info?: string;
  pleaseNote?: string;
  priceRanges?: PriceRange[];
  ticketLimit?: {
    info: string;
  };
  accessibility?: {
    info: string;
  };
}

export interface EventDetailsProps {
  event_data: EventDetails | null;
}
