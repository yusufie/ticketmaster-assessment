"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import placeholder from "@/lib/assets/images/placeholder.png";
import { Icons } from '@/lib/icons';
import { useEventStore } from '@/stores/eventStore';
import TableSkeleton from '@/components/TableSkeleton/TableSkeleton';
import { Event, EventsResponse, FetchEventsParams } from '@/lib/types/EventTable';


const API_KEY = 'kmMxhmJ3jPYQsevHUrcIVaIdtZ5MnbAu';

const fetchEvents = async ({page, keyword, sort}: FetchEventsParams): Promise<EventsResponse>  => {
  const response = await axios.get<EventsResponse>(`https://app.ticketmaster.com/discovery/v2/events.json`, {
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

  const { data, isLoading, isError } = useQuery<EventsResponse, Error>({
    queryKey: ['events', currentPage, searchKeyword, sortOption],
    queryFn: () => fetchEvents({ page: currentPage, keyword: searchKeyword, sort: sortOption }),
  });

  React.useEffect(() => {
    if (data?.page?.totalPages) {
      setTotalPages(data?.page?.totalPages);
    }
  }, [data, setTotalPages]);

  if (isLoading) return <TableSkeleton />;
  if (isError) return <div>Error fetching events</div>;

  const events = data?._embedded?.events || [];

  return (
    <section className="overflow-x-auto rounded-lg container-shadow">
      <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
        <thead className="bg-gray-500">
          <tr>
            <th className="py-1 px-1 lg:px-4 text-left hidden sm:table-cell">Image</th>
            <th className="py-1 px-1 lg:px-4 text-left">Name</th>
            <th className="py-1 px-1 lg:px-4 text-left hidden sm:table-cell">Price</th>
            <th className='py-1 px-1 lg:px-4 hidden lg:table-cell text-left'>Segment</th>
            <th className="py-1 px-1 lg:px-4 hidden lg:table-cell text-left">Date</th>
            <th className="py-1 px-1 lg:px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event: Event) => (
            <tr key={event?.id} className="border-t border-gray-400">
              <td className="py-1 px-1 lg:px-4 hidden sm:table-cell">
                <Image
                  src={event?.images?.[0].url ?? placeholder}
                  alt={event?.name}
                  width={24}
                  height={24}
                />
              </td>
              <td className="py-1 px-1 lg:px-4">
                <div className="max-w-40 lg:max-w-80 overflow-hidden">
                  <p className="truncate" title={event?.name}>
                    {event?.name}
                  </p>
                </div>
              </td>
              <td className="py-1 px-1 lg:px-4 hidden sm:table-cell">
                {event?.priceRanges?.[0]?.min} - {event?.priceRanges?.[0]?.max}
              </td>
              <td className="py-1 px-1 lg:px-4 hidden lg:table-cell">{event?.classifications?.[0]?.segment?.name}</td>
              <td className="py-1 px-1 lg:px-4 hidden lg:table-cell">{event?.dates?.start?.localDate}</td>
              <td className="py-1 px-1 lg:px-4 flex gap-4">
                <Link href={`/${event?.id}`} title='view details'
                  className="flex items-center"
                >
                  <Icons.Lens className="w-4 h-4 text-yellow-600 transform transition-transform duration-100 hover:scale-125" />
                </Link>
                <Link href={event?.url ?? '#'} title='buy tickets'
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Icons.Buy className="w-5 h-5 text-green-600 transform transition-transform duration-100 hover:scale-125" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default EventTable;