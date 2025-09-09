import Home from '@/components/home';
import Homeabout from '@/components/homeabout';
import TextMarquee from '@/components/marquee';
import Stats from '@/components/stats';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="min-w-[515px] min-h-[919px]">
      <section className='bg-primary'>
        <Home />
      </section>

      <TextMarquee bgColor="secondary" />

      <section className='bg-primary relative'>
        <div className="hidden xl:z-20 xl:absolute xl:top-[10px] xl:right-0 xl:block">
        <Image
          src="/image/flower.svg"
          alt="flower"
          width={250}
          height={250}
          className=""
        />
      </div>
        <Homeabout />
      </section>

      <section className="bg-quarternary relative">

  <Image
    src="/image/flo.svg"
    alt="flower"
    width={250}
    height={250}
    className="hidden md:z-20 md:absolute md:-top-48 md:left-0 md:block"
  />

  <div className="relative overflow-hidden pt-[220px] z-10">
    <div className="-rotate-6 w-[120%] origin-left">
      <TextMarquee bgColor="tertiary" />
    </div>
  </div>

  <Stats />

</section>

    </div>
  );
}
