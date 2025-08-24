import type { Metadata } from 'next';
import About from './components/about';
import Legacy from './components/legacy';
import Committee from './components/comitee';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div>
      <About />
      <Legacy />
      <Committee />
    </div>
  );
}
