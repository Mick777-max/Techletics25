import type { Metadata } from 'next';
import About from './components/about';
import Legacy from './components/legacy';
import Committee from './components/comitee';
import TextMarquee from '@/components/marquee';
import Image from 'next/image';
import SectionSeparatorBottom from '@/components/custom/sectionseparatorbottom';
import SectionSeparatorTop from '@/components/custom/sectionseparatortop';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div className="w-full min-w-80 overflow-clip">
      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <Image
          className="left-[-6.5rem] top-[21rem] z-0 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <About />

        <Image
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 opacity-40 lg:hidden"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <Image
          className="right-[-7rem] top-[40rem] z-10 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <SectionSeparatorBottom />
      </section>

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <Legacy />
      </section>

      <TextMarquee bg="secondary" text="black" />

      <section className="relative bg-[url('/image/bg-white.png')] bg-center bg-repeat">
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
