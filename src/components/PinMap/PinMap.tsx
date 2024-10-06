import { MapPin } from "lucide-react";
import { EventDetailsProps } from "@/lib/types/EventDetails";


const PinMap: React.FC<EventDetailsProps> = ({ event_data }) => {

  const venue = event_data?._embedded?.venues?.[0];

  return (
    <>
      {venue && (
        <div className="flex items-start space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold">{venue?.name}</p>
            <p>{venue?.address?.line1}</p>
            <p>{`${venue?.city?.name || ''}, ${venue?.state?.name || ''}, ${venue?.country?.name || ''}`}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PinMap;
