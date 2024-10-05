import { Ticket } from "lucide-react";
import Link from "next/link";
import { EventDetailsProps } from "@/lib/types/EventDetails";


const Featuring: React.FC<EventDetailsProps> = ({ event_data }) => {

    const attractions = event_data?._embedded?.attractions;

    return (
    <>
      {attractions && attractions?.length > 0 && (
        <div className="flex items-start space-x-2">
          <Ticket className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold">Featuring:</p>
            <ul className="list-disc list-inside">
              {attractions?.map((attraction, index) => (
                <li key={index}>
                  <Link
                    href={attraction?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {attraction?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Featuring;
