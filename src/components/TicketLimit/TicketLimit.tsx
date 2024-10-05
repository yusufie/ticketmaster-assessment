import { Ticket } from "lucide-react";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const TicketLimit: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.ticketLimit && (
        <div className="flex items-start space-x-2">
          <Ticket className="w-5 h-5 text-purple-500 mt-1" />
          <p>{event_data?.ticketLimit?.info}</p>
        </div>
      )}
    </>
  );
};

export default TicketLimit;
