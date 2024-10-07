import { Icons } from "@/lib/icons";
import { EventDetailsProps } from "@/lib/types/EventDetails";

const PriceRanges: React.FC<EventDetailsProps> = ({ event_data }) => {
  return (
    <>
      {event_data?.priceRanges && event_data?.priceRanges?.length > 0 && (
        <div className="flex items-start space-x-2">
          <Icons.DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold">Price Ranges:</p>
            <ul className="list-disc list-inside">
              {event_data?.priceRanges?.map((range, index) => (
                <li key={index}>
                  {range?.type}: {range?.currency} {range?.min?.toFixed(2)} -{" "}
                  {range?.max?.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceRanges;
