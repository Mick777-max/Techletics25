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
    <div className="my-gradient-bg w-full min-w-80 overflow-clip">
      <section className="relative">
        <Image
          className="absolute left-[-6.5rem] top-[21rem]"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <About />

        <Image
          className="absolute right-[-7rem] top-[40rem] z-0"
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
          className="absolute left-[-8rem] top-[-1rem]"
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
