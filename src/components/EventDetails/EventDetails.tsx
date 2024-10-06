import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card/Card';
import { EventDetailsProps } from '@/lib/types/EventDetails';
import BestImages from '@/components/BestImages/BestImages';
import CalenderDate from '@/components/CalenderDate/CalenderDate';
import PinMap from '@/components/PinMap/PinMap';
import Featuring from '@/components/Featuring/Featuring';
import InfoEvent from '@/components/InfoEvent/InfoEvent';
import PleaseNote from '@/components/PleaseNote/PleaseNote';
import PriceRanges from '@/components/PriceRanges/PriceRanges';
import TicketLimit from '@/components/TicketLimit/TicketLimit';
import Accessibility from '@/components/Accessibility/Accessibility';
import TicketBuy from '@/components/TicketBuy/TicketBuy';

const EventDetails: React.FC<EventDetailsProps> = ({ event_data }) => {

  return (
    <section data-testid="event-details-section" className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>

        <CardHeader>
          <CardTitle className="text-3xl font-bold">{event_data?.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <BestImages event_data={event_data} />

          <CalenderDate event_data={event_data} />

          <PinMap event_data={event_data} />

          <Featuring event_data={event_data} />

          <InfoEvent event_data={event_data} />

          <PriceRanges event_data={event_data} />

          <TicketLimit event_data={event_data} />

          <PleaseNote event_data={event_data} />

          <Accessibility event_data={event_data} />

          <TicketBuy event_data={event_data} />

        </CardContent>

      </Card>
    </section>
  );
};

export default EventDetails;