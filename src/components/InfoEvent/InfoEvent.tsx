import { Info } from "lucide-react";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const InfoEvent: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.info && (
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-500 mt-1" />
          <p>{event_data?.info}</p>
        </div>
      )}
    </>
  );
};

export default InfoEvent;