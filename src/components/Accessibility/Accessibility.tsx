import { Info } from "lucide-react";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const Accessibility: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.accessibility && (
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-indigo-500" />
          <p>{event_data?.accessibility?.info}</p>
        </div>
      )}
    </>
  );
};

export default Accessibility;
