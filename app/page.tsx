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
        {/* <StarsCanvas color="#ff1282" /> */}
        {/* <Image
          src="/image/Grid.svg"
          alt="bg"
          width={1000}
          height={500}
          className="absolute inset-0 z-10 h-full w-full bg-cover bg-center bg-no-repeat opacity-50"
        /> */}
        <Home />

        <SectionSeparatorBottom />
      </section>

      {/* <TextMarquee bgColor="secondary" /> */}
      <TextMarquee type="ignite" />

      {/* <div className='w-full'>
        <Image 
         src='/icons/section-separator-top.png'
         alt="section separator"
         width={1000}
         height={50}
         className='w-full h-auto'/>
      </div> */}

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        {/* <div className="hidden xl:absolute xl:right-0 xl:top-[10px] xl:z-20 xl:block">
          <Image
            src="/image/flower.svg"
            alt="flower"
            width={250}
            height={250}
            className=""
          />
        </div> */}

        <SectionSeparatorTop />

        <Homeabout />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="ignite" />

      <section className="relative bg-[url('/image/ruins-bg-grey.png')] bg-cover bg-center py-[4rem] max-cmd:pb-[11rem] max-md:pb-[35rem]">
        <SectionSeparatorTop />

        <span id="stats"></span>

        <Stats />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="techletics" />

      <section className="relative flex h-[100vh] flex-col items-center justify-center bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <Memories />

        <SectionSeparatorBottom />
      </section>

      <section className="relative bg-quarternary py-[5rem]">
        <SectionSeparatorTop />

        <PrevEvents />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="ignite" />

      <section className="relative h-[90vh] bg-black">
        <Filler />
      </section>

      <TextMarquee type="techletics" />

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <Media />

        <SectionSeparatorBottom />
      </section>

      <TextMarquee type="ignite" />
    </div>
  );
}
