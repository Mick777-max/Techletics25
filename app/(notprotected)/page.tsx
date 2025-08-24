import Home from '@/components/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
