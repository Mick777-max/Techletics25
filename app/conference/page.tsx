import type { Metadata } from 'next';
import Banner from './_components/banner';
import Conferenceabout from './_components/about';
import LastDate from './_components/lastdate';
import Roadmap from './_components/roadmap';
import Guidelines from './_components/guidelines';
import Submit from './_components/submit';
import DynamicTextMarquee from '@/components/custom/marquee';
import SectionSeparator from '@/components/custom/sectionSeparator';

export const metadata: Metadata = {
  title: 'Conference',
  description: "Join our technical conference at Techletics '25",
};

export default function ConferencePage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative bg-gradient-to-br from-stone-800 to-black">
        <Banner />
        <SectionSeparator position="bottom" />
      </section>

      <section className='relative bg-[url("/image/bg-white.png")] bg-cover bg-center'>
        <SectionSeparator position="top" />
        <Conferenceabout />
      </section>

      <DynamicTextMarquee type="techletics" bg="secondary" text="black" />

      <section className="relative">
        <LastDate />
      </section>

      <DynamicTextMarquee type="ignite" bg="black" text="white" />

      <section className='relative bg-[url("/image/bg-white.png")] bg-center bg-repeat'>
        <SectionSeparator position="top" />
        <Roadmap />
        <SectionSeparator position="bottom" />
      </section>

      <section className="relative bg-gradient-to-b from-black via-quarternary to-stone-800">
        <Guidelines />
      </section>

      <DynamicTextMarquee bg="secondary" text="black" />

      <section className="relative bg-gradient-to-b from-[#D4AF40A3] to-[#F5ECD0]">
        <Submit />
        <SectionSeparator position="bottom" />
      </section>

      <DynamicTextMarquee />
    </div>
  );
}
