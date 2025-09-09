'use client';
import Image from 'next/image';
import TextMarquee from './marquee';
import { motion } from 'framer-motion';
import { slideIn, staggerContainer } from '@/app/utils/motion';

export default function Stats() {
  return (
    <main className="h-full mx-auto max-w-screen-2xl bg-quarternary md:relative">
      {/* <Image
        src="/image/flo.svg"
        alt="flower"
        width={250}
        height={250}
        className="hidden md:absolute md:-top-48 md:left-0 md:block"
      /> */}
      {/* <div className="pt-[210px] overflow-hidden">
        <div className="-rotate-6 w-[120%] origin-left">
          <TextMarquee bgColor="tertiary" />
        </div>
      </div> */}
      {/* <Image
        src="/logos/logo.png"
        alt="logo"
        width={300}
        height={300}
        className="hidden md:absolute md:top-[100px] md:right-0 md:block"
      /> */}

      <motion.div
  variants={staggerContainer(0.3, 0.5)}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="w-full flex flex-col gap-[50px] items-center pt-[30px]"
>
  
  <motion.div 
   variants={{
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    }}
    className="flex flex-col md:flex-row gap-8 md:gap-[200px] justify-center w-full"
  >
    <StatCard number="50+" label="CULTURAL EVENTS" fill="transparent" border="#ff1282" />
    <StatCard number="10+" label="TECH EVENTS" fill="transparent" border="#ff1282" />
  </motion.div>

  
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    }}
    className="flex flex-col cmd:flex-row gap-8 cmd:gap-[200px] justify-center w-full"
  >
    <StatCard number="35+" label="COLLEGES" fill="secondary" border="#f5f3bd" />
    <StatCard number="500k+" label="PRIZE POOL" fill="secondary" border="#f5f3bd" />
    <StatCard number="10k+" label="STUDENTS" fill="secondary" border="#f5f3bd" />
  </motion.div>

  
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    }}
    className="flex flex-col md:flex-row gap-8 md:gap-[200px] justify-center w-full"
  >
    <StatCard number="20+" label="TECH EXPERTS" fill="transparent" border="#ff1282" />
    <StatCard number="30+" label="WORKSHOPS" fill="transparent" border="#ff1282" />
  </motion.div>
</motion.div>

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
    <motion.div
      whileHover={
        { scale: 1.1 }
      }
      className="flex flex-col items-center cursor-pointer">
      <div
        className={`font-turret font-extrabold text-[150px] md:text-[120px] text-center text-${fill}`}
        style={{ WebkitTextStroke: `4px ${border}` }}
      >
        {number}
      </div>
      <div className="text-center text-primary font-secondary text-[30px]">{label}</div>
    </motion.div>
  );
}
