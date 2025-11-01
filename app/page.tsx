import Home from '@/components/home';
import Homeabout from '@/components/homeabout';
import TextMarquee from '@/components/marquee';
import Stats from '@/components/statsnew';
import type { Metadata } from 'next';
import Image from 'next/image';
import Stars from '@/components/canvas/Stars';
import StarsCanvas from '@/components/canvas/Stars';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="w-full min-w-80">
      <section className="relative bg-primary">
        {/* <StarsCanvas color="#ff1282" /> */}
        <Image
          src="/image/Grid.svg"
          alt="bg"
          width={1000}
          height={500}
          className="absolute inset-0 z-10 h-full w-full bg-cover bg-center bg-no-repeat opacity-50"
        />
        <Home />
      </section>

      {/* <TextMarquee bgColor="secondary" /> */}
      <TextMarquee type="ignite" />

      <section className="relative bg-[url('/image/bg-about.png')] bg-cover bg-center">
        {/* <div className="hidden xl:absolute xl:right-0 xl:top-[10px] xl:z-20 xl:block">
          <Image
            src="/image/flower.svg"
            alt="flower"
            width={250}
            height={250}
            className=""
          />
        </div> */}
        <Homeabout />
      </section>

      <TextMarquee type="ignite" />

      <section className="relative bg-[url('/image/bg-stats.png')] bg-cover bg-center">
        <span id="stats"></span>
        {/* <Image
          src="/image/flo.svg"
          alt="flower"
          width={250}
          height={250}
          className="absolute -top-40 left-0 z-20 w-52 md:-top-48 md:w-64"
        /> */}

        <div className="relative z-10 overflow-hidden pt-[180px] md:pt-[220px]">
          {/* <div className="w-[120%] origin-left -rotate-6">
            <TextMarquee bgColor="tertiary" />
          </div> */}
        </div>
        {/* <StarsCanvas color="white" /> */}
        <Stats />

        <div className="mt-4">
          {/* <TextMarquee bgColor="tertiary" type="secondary" /> */}
          <TextMarquee type="techletics" />
        </div>
      </section>
    </div>
  );
}
