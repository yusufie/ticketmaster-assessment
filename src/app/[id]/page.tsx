
import { getEvent } from "@/lib/getEvent";
import EventDetails from "@/components/EventDetails/EventDetails";

type Props = {
  params: { id: number | null };
}

async function DetailPage({ params }: Readonly<Props>) {

  const eventId = params?.id;

  let event_data = null;

  if (eventId) {
    event_data = await getEvent(eventId);
  }

  return (
    <main className="flex items-center justify-center w-full h-full">
      <EventDetails event_data={event_data} />
    </main>
  );
}

export default DetailPage;
