import DynamicTextMarquee from '@/components/custom/marquee';
import { Metadata } from 'next';
import TechleticsCarousel from './_components/banner';
import FeaturedEvents from './_components/featuredEvents';
import Events from './_components/events';
import SectionSeparator from '@/components/custom/sectionSeparator';

export const metadata: Metadata = {
  title: 'Events',
  description:
    "Welcome to our Events page at Techletics '25 - Explore the exciting lineup of events and activities we have planned for you!",
};

export default function EventsPage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative">
        <TechleticsCarousel />
      </section>

      <section className='relative bg-[url("/image/bg-white.png")] bg-auto bg-center py-20'>
        <SectionSeparator position="top" />

        <Events />

        <SectionSeparator position="bottom" />
      </section>

      <DynamicTextMarquee type="ignite" />

      <section className='relative bg-[url("/image/bg-white.png")] bg-cover bg-center py-20'>
        <SectionSeparator position="top" />

        <FeaturedEvents />

        <SectionSeparator position="bottom" />
      </section>

      <DynamicTextMarquee type="techletics" />
    </div>
  );
}
