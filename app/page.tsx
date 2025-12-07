import Home from '@/components/home';
import HomeAbout from '@/components/homeabout';
import TextMarquee from '@/components/marquee';
import Stats from '@/components/statsnew';
import type { Metadata } from 'next';
import Filler from '@/components/filler';
import Memories from '@/components/memories';
import Media from '@/components/media';
import PrevEvents from '@/components/prevevents';
import SectionSeparator from '@/components/custom/sectionSeparator';

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
      </section>

      <TextMarquee type="ignite" />

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparator position="top" />

        <HomeAbout />

        <SectionSeparator position="bottom" />
      </section>

      <TextMarquee type="techletics" />

      <section className="relative bg-[url('/image/ruins-bg-grey.png')] bg-cover bg-center py-[4rem] max-xl-wide:pb-[11rem] max-md:pb-[35rem]">
        <SectionSeparator position="top" />

        <span id="stats"></span>

        <Stats />

        <SectionSeparator position="bottom" />
      </section>

      <section className="relative flex h-[100vh] flex-col items-center justify-center bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparator position="top" />

        <Memories />

        <SectionSeparator position="bottom" />
      </section>

      <section className="relative bg-quarternary bg-[url('/image/footer.png')] bg-cover bg-center py-[5rem]">
        <SectionSeparator position="top" />

        <PrevEvents />

        <SectionSeparator position="bottom" />
      </section>

      <section className="relative h-[90vh] bg-black">
        <Filler />
      </section>

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparator position="top" />

        <Media />

        <SectionSeparator position="bottom" />
      </section>

      <TextMarquee type="ignite" />
    </div>
  );
}
