import { Icons } from "@/lib/icons";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const CalenderDate: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <div className="flex items-center space-x-2">
      <Icons.CalendarDays className="w-5 h-5 text-yellow-500" />
      <p>
        {new Date(
          `${event_data?.dates?.start?.localDate}T${event_data?.dates?.start?.localTime}`
        ).toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: event_data?.dates?.timezone,
        })}
      </p>
    </div>
  );
};

export default CalenderDate;
