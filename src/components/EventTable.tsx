"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useEventStore } from '@/stores/eventStore';

interface Event {
  name: string;
  id: string;
  url: string;
  dates: {
    start: {
      localDate: string;
    };
  };
}

const API_KEY = 'kmMxhmJ3jPYQsevHUrcIVaIdtZ5MnbAu';

const fetchEvents = async (page: number, keyword: string, sort: string) => {
  const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
    params: {
      apikey: API_KEY,
      page: page - 1,
      size: 20,
      keyword: keyword || undefined,
      sort: sort,
    }
  });
  return response?.data;
};

const EventTable: React.FC = () => {
  const { currentPage, searchKeyword, sortOption, setTotalPages } = useEventStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', currentPage, searchKeyword, sortOption],
    queryFn: () => fetchEvents(currentPage, searchKeyword, sortOption),
  });

  React.useEffect(() => {
    if (data?.page?.totalPages) {
      setTotalPages(data?.page?.totalPages);
    }
  }, [data, setTotalPages]);

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error fetching events</div>;

  const events = data?._embedded?.events || [];

  return (
    <section className="overflow-x-auto">
      <table className="min-w-full bg-gray-600">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-1 px-4 text-left">Event Name</th>
            <th className="py-1 px-4 text-left">Date</th>
            <th className="py-1 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event: Event) => (
            <tr key={event?.id} className="border-b">
              <td className="py-1 px-4">{event?.name}</td>
              <td className="py-1 px-4">{event?.dates?.start?.localDate}</td>
              <td className="py-1 px-4">
                <Link href={`/${event?.id}`} className="text-blue-500 hover:underline mr-4">
                  Details
                </Link>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Buy
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default EventTable;