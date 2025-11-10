'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '@/app/utlis/motion';

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-[90vh] max-w-screen-2xl items-center justify-center gap-8 overflow-hidden pb-[0.5rem] max-lg:flex-col max-lg:gap-[1rem] max-sm:gap-0">
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
          <span className="z-10 -rotate-6 font-orbitron text-[3rem] font-extrabold leading-none text-quarternary max-xl-wide:text-[3rem] max-xs:text-[2rem] md:text-[5rem]">
            IGNITE.INSPIRE.
          </span>
          <Image
            src="/icons/sparkle.png"
            alt="Spark icon"
            width={100}
            height={100}
            className="h-[3rem] w-auto md:h-[7rem]"
          />
        </motion.div>

        <motion.div
          variants={fadeIn('', 'tween', 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="z-10 font-orbitron font-extrabold leading-none text-quarternary max-xl-wide:text-[4.5rem] max-xs:text-[3.5rem] md:text-[7.5rem]">
            ILLUMINATE.
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-2 z-30 mt-2 flex w-full items-center justify-center">
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
