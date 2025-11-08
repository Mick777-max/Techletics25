import TextMarquee from '@/components/marquee';
import { Events, FeaturedEvents } from './_components';
import { Metadata } from 'next';
import TechleticsCarousel from './_components/banner';
import SectionSeparatorTop from '@/components/custom/sectionseparatortop';
import SectionSeparatorBottom from '@/components/custom/sectionseparatorbottom';

export const metadata: Metadata = {
  title: 'Events',
  description:
    "Welcome to our Events page at Techletics '25 - Explore the exciting lineup of events and activities we have planned for you!",
};

export default function EventsPage() {
  return (
    <section className="mx-auto h-full max-w-screen-2xl">
      <TechleticsCarousel />
      <Events />
      <TextMarquee />
      <FeaturedEvents />
    </section>
  );
}
