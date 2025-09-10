'use client';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/app/utlis/motion';

export default function Stats() {
  return (
    <main className="mx-auto h-full max-w-screen-2xl bg-quarternary md:relative">
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
        className="flex w-full flex-col items-center gap-[50px] pt-[30px]"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="flex w-full flex-col justify-center gap-8 md:flex-row md:gap-[200px]"
        >
          <StatCard
            number="50+"
            label="CULTURAL EVENTS"
            fill="transparent"
            border="#ff1282"
          />
          <StatCard
            number="10+"
            label="TECH EVENTS"
            fill="transparent"
            border="#ff1282"
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="flex w-full flex-col justify-center gap-8 cmd:flex-row cmd:gap-[200px]"
        >
          <StatCard
            number="35+"
            label="COLLEGES"
            fill="secondary"
            border="#f5f3bd"
          />
          <StatCard
            number="500k+"
            label="PRIZE POOL"
            fill="secondary"
            border="#f5f3bd"
          />
          <StatCard
            number="10k+"
            label="STUDENTS"
            fill="secondary"
            border="#f5f3bd"
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="flex w-full flex-col justify-center gap-8 md:flex-row md:gap-[200px]"
        >
          <StatCard
            number="20+"
            label="TECH EXPERTS"
            fill="transparent"
            border="#ff1282"
          />
          <StatCard
            number="30+"
            label="WORKSHOPS"
            fill="transparent"
            border="#ff1282"
          />
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
      whileHover={{ scale: 1.1 }}
      className="flex cursor-pointer flex-col items-center"
    >
      <div
        className={`text-center font-turret text-[150px] font-extrabold md:text-[120px] text-${fill}`}
        style={{ WebkitTextStroke: `4px ${border}` }}
      >
        {number}
      </div>
      <div className="text-center font-secondary text-[30px] text-primary">
        {label}
      </div>
    </motion.div>
  );
}
