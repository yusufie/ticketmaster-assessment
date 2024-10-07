import { Icons } from "@/lib/icons";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const TicketLimit: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.ticketLimit && (
        <div className="flex items-start space-x-2">
          <Icons.Ticket className="w-5 h-5 text-purple-500" />
          <p>{event_data?.ticketLimit?.info}</p>
        </div>
      )}
    </>
  );
};

export default TicketLimit;
