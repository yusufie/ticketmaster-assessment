import { Icons } from "@/lib/icons";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const PleaseNote: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.pleaseNote && (
        <div className="flex items-start space-x-2">
          <Icons.AlertCircle className="w-5 h-5 text-red-500" />
          <p className="break-words break-all whitespace-pre-line text-red-500">{event_data?.pleaseNote}</p>
        </div>
      )}
    </>
  );
};

export default PleaseNote;
