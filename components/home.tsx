'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '@/app/utlis/motion';

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

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-[90vh] max-w-screen-2xl items-center justify-center gap-8 bg-primary pb-[0.5rem] max-lg:flex-col max-lg:gap-[1rem] max-sm:gap-0">
      {/* Stars (Sparklers) */}
      {/* {starPositions.map((pos, index) => (
        <Image
          key={index}
          src="/icons/Vector.svg"
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
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 flex h-[42rem] max-xsm:h-[25rem] max-lg:w-full justify-center overflow-hidden"
      >
        <Image
          src="/image/womanbg-1.png"
          alt="Woman"
          width={600}
          height={1000}
          className="h-full w-auto -rotate-6 object-contain md:h-full"
        />
      </motion.div>

      <motion.div
        variants={slideIn('up', 'tween', 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 flex shrink flex-col items-center gap-1 md:static md:items-start"
      >
        <motion.div
          variants={fadeIn('', 'tween', 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="z-10 -rotate-6 font-secondary text-[3rem] font-extrabold leading-none text-quarternary max-cmd:text-[3.125rem] md:text-[5rem] max-xsm:text-[2.5rem]">
            IGNITE.INSPIRE.
          </span>
          <Image
            src="/icons/Vector.svg"
            alt="Spark icon"
            width={100}
            height={100}
            className="h-[3rem] w-auto md:h-[6.25rem]"
          />
        </motion.div>

        <motion.div
          variants={fadeIn('', 'tween', 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="z-10 font-secondary font-extrabold leading-none text-quarternary max-cmd:text-[4.5rem] md:text-[7.5rem] max-xsm:text-[3.5rem]">
            ILLUMINATE.
          </span>
        </motion.div>
      </motion.div>

      <div className="z-30 mt-2 flex w-full items-center justify-center lg:absolute lg:bottom-1">
        <a href="#stats">
          <div className="flex h-[4rem] w-[2.188rem] items-start justify-center rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="mb-1 h-3 w-3 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
