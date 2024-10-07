import { Icons } from "@/lib/icons";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const Accessibility: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.accessibility && (
        <div className="flex items-start space-x-2">
          <Icons.Info className="w-5 h-5 text-indigo-500" />
          <p className="break-words break-all whitespace-pre-line">{event_data?.accessibility?.info}</p>
        </div>
      )}
    </>
  );
};

export default Accessibility;
