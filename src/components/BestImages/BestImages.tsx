import Image from "next/image";
import { Attraction } from "@/lib/types/EventDetails";
import { EventDetailsProps } from "@/lib/types/EventDetails";


const BestImages: React.FC<EventDetailsProps> = ({ event_data }) => {

  const attractions = event_data?._embedded?.attractions;

  // Function to get the best image for each attraction
  const getBestImage = (images: Attraction["images"]) => {
    if (!images || images.length === 0) return null;
    const preferredImage =
      images?.find((img) => img?.ratio === "3_2") ||
      images?.find((img) => img?.ratio === "16_9");
    return preferredImage ? preferredImage?.url : images?.[0]?.url;
  };

  return (
    <>
      {attractions && attractions?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {attractions?.map((attraction, index) => {
            const imageUrl = getBestImage(attraction?.images);
            return (
              <div key={index} className="relative h-48 overflow-hidden rounded-lg">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={attraction?.name || ''}
                    layout="fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-300 hover:scale-110 z-10"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-end p-2">
                  <p className="text-white text-sm font-semibold">
                    {attraction?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BestImages;
