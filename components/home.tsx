'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '@/app/utlis/motion';

export default function Home() {
  return (
    <div className="pb-[0.5rem] relative flex items-center justify-center min-h-[90vh] mx-auto max-w-screen-2xl bg-primary gap-8 max-lg:flex-col max-lg:gap-[1rem]">

      
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='h-[40rem] min-w-[18.75rem]'
      >
        <Image
          src="/image/womanbg-1.png"
          alt="Woman"
          width={600}
          height={1000}
          className="h-full w-auto object-contain -rotate-6"
        />
      </motion.div>

      <motion.div
        variants={slideIn('up', 'tween', 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center md:items-start gap-1 shrink"
      >
        <motion.div
          variants={fadeIn('', 'tween', 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="-rotate-6 font-secondary text-[5rem] font-extrabold leading-none text-quarternary max-cmd:text-[3.125rem]">
            IGNITE.INSPIRE.
          </span>
          <Image
            src="/icons/Vector.svg"
            alt="Spark icon"
            width={100}
            height={100}
            className="h-[6.25rem] w-auto"
          />
        </motion.div>

        <motion.div
          variants={fadeIn('', 'tween', 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="font-secondary text-[7.5rem] font-extrabold leading-none text-quarternary max-cmd:text-[5rem]">
            ILLUMINATE.
          </span>
        </motion.div>
      </motion.div>

      
      <div className="w-full flex justify-center items-center mt-2 lg:absolute lg:bottom-1">
  <a href="#about">
    <div className="w-[2.188rem] h-[4rem] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
      <motion.div
        animate={{ y: [0, 24, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop'
        }}
        className='w-3 h-3 rounded-full bg-secondary mb-1'
      />
    </div>
  </a>
</div>
    </div>
  );
}
