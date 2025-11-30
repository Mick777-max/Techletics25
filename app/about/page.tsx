import type { Metadata } from 'next';
import About from './components/about';
import Legacy from './components/legacy';
import Committee from './components/comitee';
import TextMarquee from '@/components/marquee';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div className="w-full min-w-80 overflow-clip bg-tertiary">
      <section className="relative">
        <Image
          className="left-[-6.5rem] top-[21rem] z-0 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <About />

        <Image
          className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 opacity-40 lg:hidden"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <Image
          className="right-[-7rem] top-[40rem] z-0 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />
      </section>

      {/* <TextMarquee type="techletics" bg="secondary" text="black" /> */}

      <section className="relative">
        <Legacy />
      </section>

      <TextMarquee bg="secondary" text="black" />

      <section className="relative">
        <Image
          className="left-[-8rem] top-[-1rem] z-0 hidden opacity-75 lg:absolute xl-wide:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <Committee />
      </section>

      <TextMarquee type="techletics" bg="secondary" text="black" />
    </div>
  );
}
