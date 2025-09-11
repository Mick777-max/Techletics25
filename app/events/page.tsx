import Title from '@/components/title';
import TextMarquee from '@/components/marquee';
import { Events, FeaturedEvents } from './_components';

export default function EventsPage() {
  return (
    <>
      <div className="mt-16 md:mt-10"></div>
      <Title title="EVENTS" />
      <Events />
      <TextMarquee bgColor="secondary" />
      <FeaturedEvents />
    </>
  );
}
