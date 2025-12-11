'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { zoomIn, zoomOutAndExit } from '@/app/utlis/motion';
import Countdown from './custom/countdown';
import StripeCurtain from './custom/stripeCurtains';

export default function Hero() {
  return (
    <div className="relative mx-auto flex min-h-[100vh] max-w-screen-2xl flex-col items-center justify-center gap-0 overflow-hidden pb-8 pt-4 sm:gap-4">
      <motion.div
        className="absolute z-50 h-24"
        initial="hidden"
        animate={['show', 'exit']}
        variants={zoomOutAndExit}
      >
        <Image
          src="/logos/techletics-metal.svg"
          alt="logo"
          width={100}
          height={100}
          className="h-full w-auto"
        />
      </motion.div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full scale-[1.117] object-cover"
      >
        <source src="/image/cloudsBg.mp4" type="video/mp4" />
      </video>

      <StripeCurtain />

      <motion.div
        variants={zoomIn(0.8, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 mt-10 flex shrink flex-col items-center justify-center gap-1 md:static md:items-start"
      >
        <motion.div className="mt-24 flex w-full flex-col items-center justify-center gap-2 md:mt-0 md:flex-row md:gap-10">
          <span className="z-10 block text-center font-orbitron text-[3rem] font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            IGNITE
          </span>
          <span className="whiteTextBorder text-4xl text-white">✦</span>
          <span className="z-10 block text-center font-orbitron text-[3rem] font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            INSPIRE
          </span>
          <span className="whiteTextBorder text-4xl text-white">✦</span>
        </motion.div>

        <motion.div className="flex w-full flex-col items-center justify-center md:flex-row md:gap-10">
          <span className="z-10 block text-center font-orbitron text-[3rem] font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
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
        className="z-30 mt-10 flex shrink flex-col items-center justify-center gap-1 md:static md:items-start"
      >
        <Countdown targetDate="2026-02-05T00:00:00"></Countdown>
      </motion.div>
    </div>
  );
}
