import Title from '@/components/title';
import TextMarquee from '@/components/marquee';
import { Events, FeaturedEvents } from './_components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description:
    "Welcome to our Events page at Techletics '25 - Explore the exciting lineup of events and activities we have planned for you!",
};

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
