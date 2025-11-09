import Home from '@/components/home';
import Homeabout from '@/components/homeabout';
import TextMarquee from '@/components/marquee';
import Stats from '@/components/statsnew';
import type { Metadata } from 'next';
import Image from 'next/image';
import Stars from '@/components/canvas/Stars';
import StarsCanvas from '@/components/canvas/Stars';
import Filler from '@/components/filler';
import Memories from '@/components/memories';
import Media from '@/components/media';
import SectionSeparatorBottom from '@/components/custom/sectionseparatorbottom';
import SectionSeparatorTop from '@/components/custom/sectionseparatortop';
import PrevEvents from '@/components/prevevents';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <Home />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="ignite" />

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <Homeabout />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="techletics" />

      <section className="relative bg-[url('/image/ruins-bg-grey.png')] bg-cover bg-center py-[4rem] max-cmd:pb-[11rem] max-md:pb-[35rem]">
        <SectionSeparatorTop />

        <span id="stats"></span>

        <Stats />

        <SectionSeparatorBottom />
      </section>

      {/* <TextMarquee type="techletics" /> */}

      <section className="relative flex h-[100vh] flex-col items-center justify-center bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <Memories />

        <SectionSeparatorBottom />
      </section>

      <section className="relative bg-quarternary bg-[url('/image/footer.png')] bg-cover bg-center py-[5rem]">
        <SectionSeparatorTop />

        <PrevEvents />

        <SectionSeparatorBottom />
      </section>

      {/* <TextMarquee type="ignite" /> */}

      <section className="relative h-[90vh] bg-black">
        <Filler />
      </section>

      {/* <TextMarquee type="techletics" /> */}

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <Media />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="ignite" />
    </div>
  );
}
