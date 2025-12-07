'use client';

import CustomButton from '@/components/custom/button';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const conferences = ['conference1', 'conference2', 'conference3'];

export default function Submit() {
  return (
    <section className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-4 py-[4rem] max-lg:px-3">
      <h1 className="mb-[0.5rem] text-wrap text-center font-orbitron text-3xl font-medium text-quarternary md:text-5xl">
        SUBMIT YOUR <span className="text-secondary">ABSTRACT</span>
      </h1>

      <span className="w-[50%] text-center font-opensans text-[1rem] font-light">
        Submit your conference & be a part of the academic community at Christ
        College of Engineering.
      </span>

      <div>
        <CustomButton className="rounded-sm border border-secondary bg-gradient-to-l from-[#D4AF4080] via-[#EBD593] to-[#C2A651] p-4 font-opensans font-bold text-primary transition-all duration-300 hover:scale-105 active:scale-95">
          SUBMIT NOW
        </CustomButton>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'tween', duration: 0.2 }} // Fast tween, no delay
            className="my-10 flex flex-wrap justify-center gap-[3rem]"
          >
            {conferences.map((conference, index) => (
              <Link
                href=""
                key={index}
                // target="_blank"
              >
                <div className="group relative h-[18.5rem] w-[16rem] bg-quarternary p-2 transition-all duration-200 ease-in hover:z-20 hover:scale-105 hover:border-[0.1px] hover:border-secondary hover:bg-secondary">
                  <div className="absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-secondary group-hover:border-quarternary"></div>

                  <div className="absolute right-0 top-0 h-5 w-5 border-r-4 border-t-4 border-secondary group-hover:border-quarternary"></div>

                  <div className="absolute bottom-0 left-0 h-5 w-5 border-b-4 border-l-4 border-secondary group-hover:border-quarternary"></div>

                  <div className="absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-secondary group-hover:border-quarternary"></div>
                  {/* <Image
                                                className="h-full w-full object-fill grayscale hover:grayscale-0"
                                                src={event.src}
                                                alt={event.name}
                                                width={300}
                                                height={300}
                                                /> */}
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
