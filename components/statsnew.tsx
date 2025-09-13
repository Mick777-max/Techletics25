'use client';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/app/utlis/motion';
import Image from 'next/image';
import SectionLayout from '@/layouts/section-layout';

const starPositions = [
  { top: '5%', left: '10%' },
  { top: '12%', left: '50%' },
  { top: '20%', left: '30%' },
  { top: '25%', left: '70%' },
  { top: '32%', left: '15%' },
  { top: '40%', left: '60%' },
  { top: '45%', left: '80%' },
  { top: '50%', left: '25%' },
  { top: '55%', left: '90%' },
  { top: '60%', left: '40%' },
  { top: '65%', left: '5%' },
  { top: '70%', left: '50%' },
  { top: '75%', left: '35%' },
  { top: '80%', left: '75%' },
  { top: '85%', left: '20%' },
  { top: '90%', left: '60%' },
  { top: '95%', left: '10%' },
];

export default function Stats() {
  return (

    <div className="relative mx-auto h-[75vh] w-full bg-quarternary pb-[4rem]">
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
        width={400}
        height={400}
        className="max-xl:hidden absolute top-[-210px] right-[-150px]"
      /> */}

      {/* Stars (Sparklers) */}
      {/* {starPositions.map((pos, index) => (
        <Image
          key={index}
          src="/icons/diamondw.svg"
          alt="Spark icon"
          width={20}
          height={20}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            opacity: 0.8, // subtle effect
            transform: 'rotate(0deg)', // Optional slight rotation if desired
          }}
        />
      ))} */}

      <div className="absolute top-[30px] right-[750px] w-[270px]">
        <div className="relative inline-block">

          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>

          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              20+ WORKSHOPS
            </span>
          </div>

        </div>
      </div>

      <div className="absolute right-[350px] w-[160px]">
        <div className="relative inline-block">

          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>

          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              60+ TECH EVENTS
            </span>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[80px] left-[750px] w-[300px]">
        <div className="relative inline-block">

          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>

          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              20+ TECH EXPERTS
            </span>
          </div>

        </div>
      </div>

      <div className="absolute left-[350px] bottom-[50px] w-[160px]">
        <div className="relative inline-block">

          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>

          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              10+ CULTURAL EVENTS
            </span>
          </div>

        </div>
      </div>









      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
          },
        }}
        className="flex w-full flex-col justify-center gap-8 cmd:flex-row cmd:gap-[200px] cmd:h-full"
      >
        <div className="flex flex-col justify-start pt-[65px]">  {/* Add top padding */}
          <StatCard
            number="35+"
            label="COLLEGES"
            fill="secondary"
            border="#f5f3bd"
          />
        </div>

        <div className="flex flex-col justify-center">
          <StatCard
            number="500k+"
            label="PRIZE POOL"
            fill="secondary"
            border="#f5f3bd"
          />
        </div>

        <div className="flex flex-col justify-end pb-[65px]"> {/* Add bottom padding */}
          <StatCard
            number="10k+"
            label="STUDENTS"
            fill="secondary"
            border="#f5f3bd"
          />
        </div>
      </motion.div>



    </div>


  );
}

type StatCardProps = {
  number: string;
  label: string;
  fill: string;
  border: string;
};

function StatCard({ number, label, fill, border }: StatCardProps) {
  const textSizeNumber = label === 'PRIZE POOL' ? 'text-[150px]' : 'text-[100px]';
  const textSizeLabel = label === 'PRIZE POOL' ? 'text-[100px]' : 'text-[80px]';

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex cursor-pointer flex-col items-center gap-0"
    >
      <div className={`relative leading-none text-center font-turret ${textSizeNumber} font-extrabold text-${fill} whitespace-nowrap`}>
        {/* Main number (on top) */}
        <span
          className={`relative z-10 leading-none text-center font-turret ${textSizeNumber} font-extrabold text-${fill}`}
        >
          {number}
        </span>

        {/* Shadow / border effect */}
        <span
          className={`absolute inset-1 z-0 leading-none text-center font-turret ${textSizeNumber} font-extrabold text-[#f5f2bd]`}
        >
          {number}
        </span>
      </div>

      <div className={`relative leading-none text-center font-turret ${textSizeLabel} text-primary font-extrabold whitespace-nowrap`}>
        {/* Main label (on top) */}
        <span
          className={`relative z-10 leading-none text-center font-turret ${textSizeLabel} font-extrabold text-${fill}`}
        >
          {label}
        </span>

        {/* Shadow / border effect */}
        <span
          className={`absolute inset-1 z-0 leading-none text-center font-turret ${textSizeLabel} font-extrabold text-[#f5f2bd]`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}