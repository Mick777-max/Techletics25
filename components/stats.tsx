'use client';
import { motion } from 'framer-motion';

export default function Stats() {
  return (
    <div className="relative mx-auto min-h-[90vh] max-w-screen-xl">
      <div className="absolute left-10 top-64 z-30 hidden w-64 cursor-pointer md:flex xl:left-1/2 xl:top-5">
        <StatLabel text="20+ WORKSHOPS" wrap="text-nowrap" />
      </div>

      <div className="absolute right-10 top-5 z-30 hidden w-40 cursor-pointer md:flex xl:top-20">
        <StatLabel text="60+ TECH EVENTS" wrap="text-wrap" />
      </div>

      <div className="absolute bottom-60 left-10 z-30 hidden w-72 cursor-pointer md:flex xl:bottom-20 xl:left-96">
        <StatLabel text="20+ TECH EXPERTS" wrap="text-nowrap" />
      </div>

      <div className="absolute right-10 top-72 z-30 hidden w-40 cursor-pointer md:flex xl:left-12 xl:right-1/2 xl:top-96">
        <StatLabel text="10+ CULTURAL EVENTS" wrap="text-wrap" />
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
        className="flex w-full flex-col justify-center gap-12 px-4 md:gap-36 xl:gap-0"
      >
        <div className="flex justify-center md:hidden">
          <div className="z-30 w-40 cursor-pointer">
            <StatLabel text="60+ TECH EVENTS" wrap="text-wrap" />
          </div>
        </div>

        <div className="flex flex-col justify-start md:pt-16 xl:flex-row xl:items-start">
          {' '}
          <StatCard number="35+" label="COLLEGES" fill="secondary" />
        </div>

        <div className="flex justify-center md:hidden">
          <div className="z-30 w-64 cursor-pointer">
            <StatLabel text="20+ WORKSHOPS" wrap="text-nowrap" />
          </div>
        </div>

        <div className="flex flex-col justify-center xl:flex-row xl:items-center">
          <StatCard number="500k+" label="PRIZE POOL" fill="secondary" />
        </div>

        <div className="flex justify-center md:hidden">
          <div className="z-30 w-40 cursor-pointer">
            <StatLabel text="10+ CULTURAL EVENTS" wrap="text-wrap" />
          </div>
        </div>

        <div className="flex flex-col justify-end md:pb-16 xl:flex-row xl:items-end">
          {' '}
          <StatCard number="10k+" label="STUDENTS" fill="secondary" />
        </div>

        <div className="flex justify-center md:hidden">
          <div className="z-30 w-72 cursor-pointer">
            <StatLabel text="20+ TECH EXPERTS" wrap="text-nowrap" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

type StatLabelProps = {
  text: string;
  wrap: string;
};

function StatLabel({ text, wrap }: StatLabelProps) {
  return (
    <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
      <div className="absolute left-2 top-2 size-full rounded-xl border-2 border-black bg-secondary"></div>
      <div
        className={`relative z-[20] rounded-xl border-2 border-black bg-primary p-4 ${wrap}`}
      >
        <span className="font-orbitron text-xl font-bold md:text-3xl">
          {text}
        </span>
      </div>
    </motion.div>
  );
}

type StatCardProps = {
  number: string;
  label: string;
  fill: string;
};

function StatCard({ number, label, fill }: StatCardProps) {
  const textSizeNumber =
    label === 'PRIZE POOL'
      ? 'text-[60px] xs:text-[80px] md:text-[100px]'
      : 'text-[60px] xs:text-[70px] md:text-[80px]';
  const textSizeLabel =
    label === 'PRIZE POOL'
      ? 'text-[40px] xs:text-[55px] md:text-[70px]'
      : 'text-[40px] xs:text-[55px] md:text-[70px]';

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="z-30 flex cursor-pointer flex-col items-center gap-0"
    >
      <div
        className={`relative text-center font-turret leading-none ${textSizeNumber} font-extrabold text-${fill}`}
      >
        <span
          className={`relative z-10 text-center font-turret leading-none ${textSizeNumber} font-extrabold text-${fill} whitespace-nowrap`}
        >
          {number}
        </span>

        <span
          className={`absolute inset-1 z-0 text-center font-turret leading-none xs:inset-1.5 ${textSizeNumber} whitespace-nowrap font-extrabold text-black`}
        >
          {number}
        </span>
      </div>

      <div
        className={`relative text-center font-turret leading-none ${textSizeLabel} font-extrabold text-primary`}
      >
        <span
          className={`relative z-10 text-center font-turret leading-none ${textSizeLabel} font-extrabold text-${fill} whitespace-nowrap`}
        >
          {label}
        </span>

        <span
          className={`absolute inset-1 z-0 text-center font-turret leading-none xs:inset-1.5 ${textSizeLabel} whitespace-nowrap font-extrabold text-black`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
