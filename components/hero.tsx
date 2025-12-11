'use client';

import { motion } from 'framer-motion';
import { zoomIn } from '@/app/utlis/motion';
import Countdown from './custom/countdown';

export default function Hero() {
  return (
    <div className="relative mx-auto flex size-full max-w-screen-2xl flex-col items-center justify-center gap-0 pb-8 pt-4 sm:gap-4">
      <motion.div
        variants={zoomIn(0.8, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 mt-10 flex shrink flex-col items-center justify-center gap-1"
      >
        <motion.div className="mt-24 flex w-full flex-col items-center justify-center gap-2 md:mt-0 md:flex-row md:gap-10">
          <span className="z-10 block text-center font-orbitron text-5xl font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            IGNITE
          </span>
          <span className="whiteTextBorder text-4xl text-white">✦</span>
          <span className="z-10 block text-center font-orbitron text-5xl font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            INSPIRE
          </span>
          <span className="whiteTextBorder text-4xl text-white">✦</span>
        </motion.div>

        <motion.div className="flex w-full flex-col items-center justify-center md:flex-row md:gap-10">
          <span className="z-10 block text-center font-orbitron text-5xl font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            ILLUMINATE
          </span>

          <span className="whiteTextBorder text-4xl text-white">✦</span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={zoomIn(1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 mt-10 flex shrink flex-col items-center justify-center gap-1"
      >
        <Countdown targetDate="2026-02-05T00:00:00"></Countdown>
      </motion.div>
    </div>
  );
}
