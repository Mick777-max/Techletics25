import type { Metadata } from 'next';
// import Conference from '../../public/archive/conference';
import Banner from './components/banner';
import Conferenceabout from './components/about';
import LastDate from './components/lastdate';
import Roadmap from './components/roadmap';
import Guidelines from './components/guidelines';
import Submit from './components/submit';
import SectionSeparatorBottom from '@/components/custom/sectionSeparatorBottom';
import SectionSeparatorTop from '@/components/custom/sectionSeparatorTop';
import TextMarquee from '@/components/marquee';

export const metadata: Metadata = {
  title: 'Conference',
  description: "Join our technical conference at Techletics '25",
};

export default function ConferencePage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative bg-gradient-to-br from-stone-800 to-black">
        <Banner />
        <SectionSeparatorBottom />
      </section>

      <section className='relative bg-[url("/image/bg-white.png")] bg-cover bg-center'>
        <SectionSeparatorTop />
        <Conferenceabout />
      </section>

      <TextMarquee type="techletics" bg="secondary" text="black" />

      <section className="relative">
        <LastDate />
        {/* <SectionSeparatorBottom /> */}
      </section>

      <TextMarquee type="ignite" bg="black" text="white" />

      <section className='relative bg-[url("/image/bg-white.png")] bg-center bg-repeat'>
        <SectionSeparatorTop />
        <Roadmap />
        <SectionSeparatorBottom />
      </section>

      <section className="relative bg-gradient-to-b from-black via-quarternary to-stone-800">
        <Guidelines />
      </section>

      <TextMarquee bg="secondary" text="black" />

      <section className="relative bg-gradient-to-b from-[#D4AF40A3] to-[#F5ECD0]">
        <Submit />
        <SectionSeparatorBottom />
      </section>

      <TextMarquee />
    </div>
  );
}
