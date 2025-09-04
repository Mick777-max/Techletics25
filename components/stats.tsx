import Image from 'next/image';
import TextMarquee from './marquee';

export default function Stats() {
  return (
    <main className="h-screen w-full bg-quarternary md:relative">
      <Image
        src="/image/flo.svg"
        alt="flower"
        width={250}
        height={250}
        className="hidden md:absolute md:-top-48 md:left-0 md:block"
      />
      <div className="-rotate-12 pt-40">
        <TextMarquee bgColor="tertiary" />
      </div>
    </main>
  );
}
