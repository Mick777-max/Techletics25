import Home from '@/components/home';
import Homeabout from '@/components/homeabout';
import TextMarquee from '@/components/marquee';
import Stats from '@/components/stats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Home />
      <TextMarquee bgColor="secondary" />
      <Homeabout />
      <Stats />
    </div>
  );
}
