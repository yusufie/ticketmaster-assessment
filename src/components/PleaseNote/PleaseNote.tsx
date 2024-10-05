import { AlertCircle } from "lucide-react";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const PleaseNote: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.pleaseNote && (
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
          <p className="text-yellow-700">{event_data?.pleaseNote}</p>
        </div>
      )}
    </>
  );
};

export default PleaseNote;
