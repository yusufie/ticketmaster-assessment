
import { getEvent } from "@/lib/getEvent";
import EventDetails from "@/components/EventDetails";

type Props = {
  params: { id: number }
}

async function DetailPage({ params }: Readonly<Props>) {

  const eventId = params?.id;
  console.log(eventId);

  let event_data = null;

  if (eventId) {
    event_data = await getEvent(eventId);
  }

  return (
    <main className="">
      <EventDetails event_data={event_data} />
    </main>
  );
}

export default DetailPage;