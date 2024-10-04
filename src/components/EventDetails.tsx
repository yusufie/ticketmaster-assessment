import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, MapPin, Ticket, Info, AlertCircle, DollarSign, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface EventDetails {
  name: string;
  id: string;
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
    timezone: string;
  };
  _embedded?: {
    venues?: Array<{
      name: string;
      city: { name: string };
      state: { name: string };
      country: { name: string };
      address?: { line1: string };
    }>;
    attractions?: Array<{
      name: string;
      url: string;
      images: Array<{
        url: string;
        width: number;
        height: number;
        ratio: string;
      }>;
    }>;
  };
  info?: string;
  pleaseNote?: string;
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
  ticketLimit?: {
    info: string;
  };
  accessibility?: {
    info: string;
  };
}

interface DetailsProps {
  event_data: EventDetails;
}

const EventDetails: React.FC<DetailsProps> = ({ event_data }) => {
  const venue = event_data?._embedded?.venues?.[0];
  const attractions = event_data?._embedded?.attractions;

  // Function to get the best image for each attraction
  const getBestImage = (images: Array<{ ratio: string; url: string }>) => {
    const preferredImage = images?.find(img => img?.ratio === '3_2') || images?.find(img => img?.ratio === '16_9');
    return preferredImage ? preferredImage?.url : images?.[0]?.url;
  };

  return (
    <section className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{event_data?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {attractions && attractions?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {attractions?.map((attraction, index) => (
                <div key={index} className="relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src={getBestImage(attraction?.images)}
                    alt={attraction?.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110 z-10"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 flex items-end p-2">
                    <p className="text-white text-sm font-semibold">{attraction?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <p>
              {new Date(`${event_data?.dates?.start?.localDate}T${event_data?.dates?.start?.localTime}`).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: event_data?.dates?.timezone
              })}
            </p>
          </div>

          {venue && (
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="font-semibold">{venue?.name}</p>
                <p>{venue?.address?.line1}</p>
                <p>{`${venue?.city?.name}, ${venue?.state?.name}, ${venue?.country?.name}`}</p>
              </div>
            </div>
          )}

          {attractions && attractions?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">Featuring:</p>
                <ul className="list-disc list-inside">
                  {attractions?.map((attraction, index) => (
                    <li key={index}>
                      <Link href={attraction?.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {attraction.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {event_data?.info && (
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-500 mt-1" />
              <p>{event_data?.info}</p>
            </div>
          )}

          {event_data?.pleaseNote && (
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
              <p className="text-yellow-700">{event_data?.pleaseNote}</p>
            </div>
          )}

          {event_data?.priceRanges && event_data?.priceRanges?.length > 0 && (
            <div className="flex items-start space-x-2">
              <DollarSign className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="font-semibold">Price Ranges:</p>
                <ul className="list-disc list-inside">
                  {event_data?.priceRanges?.map((range, index) => (
                    <li key={index}>
                      {range?.type}: {range?.currency} {range?.min?.toFixed(2)} - {range?.max?.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {event_data?.ticketLimit && (
            <div className="flex items-start space-x-2">
              <Ticket className="w-5 h-5 text-purple-500 mt-1" />
              <p>{event_data?.ticketLimit?.info}</p>
            </div>
          )}

          {event_data?.accessibility && (
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-indigo-500 mt-1" />
              <p>{event_data?.accessibility?.info}</p>
            </div>
          )}

          <Link
            href={event_data?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <span>Buy Tickets</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default EventDetails;