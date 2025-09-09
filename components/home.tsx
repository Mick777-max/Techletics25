'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, zoomIn } from '@/app/utils/motion';

export default function Home() {
  return (
    <div className="pb-[20px] relative flex items-center justify-center h-[100vh] mx-auto max-w-screen-2xl bg-primary gap-8 max-lg:flex-col max-lg:gap-[50px]">

      
      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='h-[620px] shrink'
      >
        <Image
          src="/image/womanbg-1.png"
          alt="Woman"
          width={600}
          height={1000}
          className="h-auto w-full object-cover -rotate-6"
        />
      </motion.div>

      
      <motion.div 
        variants={slideIn("up", "tween", 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center md:items-start gap-6"
      >
        
        <motion.div
          variants={fadeIn("", "tween", 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="leading-none -rotate-6 font-secondary text-quarternary text-[80px] max-cmd:text-[50px] font-extrabold">
            IGNITE.INSPIRE.
          </span>
          <Image
            src="/icons/Vector.svg"
            alt="Spark icon"
            width={100}
            height={100}
            className="h-[100px] w-auto"
          />
        </motion.div>

        
        <motion.div
          variants={fadeIn("", "tween", 0.2, 1)}
          className="flex items-center gap-4"
        >
          <span className="leading-none font-secondary text-quarternary text-[120px] max-cmd:text-[80px] font-extrabold">
            ILLUMINATE.
          </span>
        </motion.div>
      </motion.div>

      
      <div className='absolute bottom-1 w-full flex justify-center items-center max-cmd:bottom-0'>
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
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