import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const TicketBuy: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <Link
      href={event_data?.url || "#"}
      target="_blank" rel="noopener noreferrer"
      className="mt-4 inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      <span>Buy Tickets</span>
      <ExternalLink className="w-4 h-4" />
    </Link>
  );
};

export default TicketBuy;
