'use client';

import { container, exitItem } from '@/app/utlis/motion';
import { motion } from 'framer-motion';

export default function StripeCurtain() {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="exit"
      className="absolute z-40 flex h-full w-full items-center justify-center overflow-clip"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={exitItem}
          className={`h-full min-w-[15rem] border-2 border-gray-500 border-opacity-15 ${i % 2 == 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-black to-stone-950 md:min-w-[25rem]`}
        />
      ))}
    </motion.div>
  );
}
