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
    <div className="w-full min-w-80">
      <section className="bg-primary">
        <Home />
      </section>

      <TextMarquee bgColor="secondary" />

      <section className="relative bg-primary">
        <div className="hidden xl:absolute xl:right-0 xl:top-[10px] xl:z-20 xl:block">
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

      <section className="relative bg-quarternary">
        <Image
          src="/image/flo.svg"
          alt="flower"
          width={250}
          height={250}
          className="absolute -top-40 left-0 z-20 w-52 md:-top-48 md:w-64"
        />

        <div className="relative z-10 overflow-hidden pt-[180px] md:pt-[220px]">
          <div className="w-[120%] origin-left -rotate-6">
            <TextMarquee bgColor="tertiary" />
          </div>
        </div>

        <Stats />
        <TextMarquee bgColor="tertiary" type="secondary" />
      </section>
    </div>
  );
}
