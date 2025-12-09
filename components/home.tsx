'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { zoomIn, zoomOutAndExit } from '@/app/utlis/motion';
import Countdown from './custom/countdown';
import StripeCurtain from './custom/stripeCurtains';

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-[100vh] max-w-screen-2xl flex-col items-center justify-center gap-4 overflow-hidden pt-[1rem] max-lg:gap-[1rem] max-sm:gap-0">
      <motion.div
        className="absolute z-50 h-[6rem]"
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
        <source src="/image/clouds3.mp4" type="video/mp4" />
      </video>

      <StripeCurtain />

      <motion.div
        variants={zoomIn(0.8, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 mt-10 flex shrink flex-col items-center justify-center gap-1 md:static md:items-start"
      >
        <motion.div className="flex w-full items-center justify-center gap-10 max-md:mt-[6rem] max-md:flex-col max-md:gap-0">
          <span className="z-10 block text-center font-orbitron text-[3rem] font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            IGNITE
          </span>
          <span
            className={`text-[2.5rem] text-white`}
            style={{ WebkitTextStroke: '1px white' }}
          >
            ✦
          </span>
          <span className="z-10 block text-center font-orbitron text-[3rem] font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            INSPIRE
          </span>
          <span
            className={`text-[2.5rem] text-white`}
            style={{ WebkitTextStroke: '1px white' }}
          >
            ✦
          </span>
        </motion.div>

        <motion.div
          // variants={zoomIn(0.2, 1)}
          className="flex w-full items-center justify-center gap-10 max-md:flex-col max-md:gap-0"
        >
          <span className="z-10 block text-center font-orbitron text-[3rem] font-extrabold leading-none text-primary [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] md:text-[5rem]">
            ILLUMINATE
          </span>

          <span
            className={`text-[2.5rem] text-white`}
            style={{ WebkitTextStroke: '1px white' }}
          >
            ✦
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        // variants={zoomIn(1, 1, 150)}
        variants={zoomIn(1, 1)}
        // variants = {
        //   {
        //     hidden:
        //     {
        //       scale: 0.7,
        //       x: -250,
        //       y: 50
        //     },
        //     show: {
        //       scale: 1,
        //       x: 0,
        //       y: 0,
        //       transition: {
        //         type: "tween",
        //         duration: 1,
        //         delay: 1
        //       }
        //     }
        //   }
        // }
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-30 mt-10 flex shrink flex-col items-center justify-center gap-1 md:static md:items-start"
      >
        <Countdown targetDate="2026-02-05T00:00:00"></Countdown>
      </motion.div>

      {/* <div className="absolute bottom-2 z-30 mt-2 flex w-full items-center justify-center">
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
      </div> */}
    </div>
  );
}
