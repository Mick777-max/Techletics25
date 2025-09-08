import Image from 'next/image';
import TextMarquee from './marquee';

export default function Stats() {
  return (
    <main className="h-full w-full bg-quarternary md:relative">
      <Image
        src="/image/flo.svg"
        alt="flower"
        width={250}
        height={250}
        className="hidden md:absolute md:-top-48 md:left-0 md:block"
      />
      <div className="pt-[210px] overflow-hidden">
  <div className="-rotate-6 w-[120%] origin-left">
    <TextMarquee bgColor="tertiary" />
  </div>
</div>
      {/* <Image
        src="/logos/logo.png"
        alt="logo"
        width={300}
        height={300}
        className="hidden md:absolute md:top-[100px] md:right-0 md:block"
      /> */}

      <div className="mt-[30px] flex flex-col items-center gap-8">

        {/* First Row */}
        <div className="w-full flex flex-col gap-8 md:flex-row md:gap-[200px] justify-center">
  <StatCard number="50+" label="CULTURAL EVENTS" fill="transparent" border="#ff1282" />
  <StatCard number="10+" label="CULTURAL EVENTS" fill="transparent" border="#ff1282" />
</div>

{/* Second Row */}
<div className="w-full flex flex-col gap-8 cmd:flex-row cmd:gap-[200px] justify-center">
  <StatCard number="35+" label="CULTURAL EVENTS" fill="secondary" border="#f5f3bd" />
  <StatCard number="500k+" label="CULTURAL EVENTS" fill="secondary" border="#f5f3bd" />
  <StatCard number="10k+" label="CULTURAL EVENTS" fill="secondary" border="#f5f3bd" />
</div>

{/* Third Row */}
<div className="w-full flex flex-col gap-8 md:flex-row md:gap-[200px] justify-center">
  <StatCard number="20+" label="CULTURAL EVENTS" fill="transparent" border="#ff1282" />
  <StatCard number="30+" label="CULTURAL EVENTS" fill="transparent" border="#ff1282" />
</div>

      </div>
    </main>
  );
}

type StatCardProps = {
  number: string;
  label: string;
  fill: string;
  border: string;
};

function StatCard({ number, label, fill, border }: StatCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`font-sans font-extrabold text-[150px] md:text-[120px] text-center text-${fill}`}
        style={{ WebkitTextStroke: `4px ${border}` }}
      >
        {number}
      </div>
      <div className="text-center text-primary font-secondary text-[30px]">{label}</div>
    </div>
  );
}
