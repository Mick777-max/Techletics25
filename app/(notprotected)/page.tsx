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
    <div className="w-full min-w-[525px]">
      <Home />
      <TextMarquee bgColor="secondary" />
      <Homeabout />
      <Stats />
    </div>
  );
}
