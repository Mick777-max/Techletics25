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
    <div className="my-gradient-bg w-full min-w-80">
      <section className="relative">
        <About />
      </section>

      <TextMarquee type="techletics" bg="secondary" text="black" />

      <section className="relative">
        <Legacy />
      </section>

      <TextMarquee bg="secondary" text="black" />

      <section className="relative">
        <Committee />
      </section>

      <TextMarquee type="techletics" bg="secondary" text="black" />
    </div>
  );
}
