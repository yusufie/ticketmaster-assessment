export interface Event {
  id: string;
  name: string;
  classifications?: {
    segment?: {
      name?: string;
    };
  }[];
  dates?: {
    start?: {
      localDate?: string;
    };
  };
  url?: string;
  priceRanges?: {
    min?: number;
    max?: number;
  }[];
  images?: {
    url?: string;
  }[];
}

export interface EventsResponse {
  _embedded?: {
    events: Event[];
  };
  page?: {
    totalPages: number;
  };
}

export interface FetchEventsParams {
  page: number;
  keyword: string;
  sort: string;
}
