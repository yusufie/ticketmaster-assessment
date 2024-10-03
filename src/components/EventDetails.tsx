interface EventDetails {
    name: string;
    id: string;
    url: string;
    dates: {
      start: {
        localDate: string;
        localTime: string;
      };
    };
    _embedded?: {
      venues?: Array<{
        name: string;
        city: { name: string };
        state: { name: string };
        country: { name: string };
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
}

interface DetailsProps {
  event_data: EventDetails;
}

const EventDetails:React.FC<DetailsProps> = ({event_data}) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{event_data?.name}</h1>
      <p>Date: {event_data?.dates?.start?.localDate} at {event_data?.dates?.start?.localTime}</p>
      {event_data?._embedded?.venues && event_data?._embedded?.venues?.length > 0 && (
        <p>
          Venue: {event_data?._embedded?.venues[0].name}, {event_data?._embedded?.venues[0]?.city?.name}, {event_data?._embedded?.venues[0]?.state?.name}, {event_data?._embedded?.venues[0]?.country?.name}
        </p>
      )}
      {event_data?.info && <p className="mt-4"><strong>Info:</strong> {event_data.info}</p>}
      {event_data?.pleaseNote && <p className="mt-2"><strong>Please Note:</strong> {event_data.pleaseNote}</p>}
      {event_data?.priceRanges && event_data?.priceRanges?.length > 0 && (
        <div className="mt-4">
          <strong>Price Ranges:</strong>
          <ul>
            {event_data?.priceRanges?.map((range, index) => (
              <li key={index}>
                {range?.type}: {range?.currency} {range?.min} - {range?.max}
              </li>
            ))}
          </ul>
        </div>
      )}
      <a href={event_data?.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Buy Tickets
      </a>
    </div>
  )
}

export default EventDetails