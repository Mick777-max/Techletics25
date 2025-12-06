'use client';
import { CommitteeCard } from '@/components/cards';
import TextMarquee from '@/components/marquee';
import { motion } from 'framer-motion';
import { CommitteeData } from '@/app/data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Committee() {
  return (
    <div className="relative mx-auto max-w-screen-xl overflow-visible px-2 pt-6">
      <div className="h-[0.3rem] w-full bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      {CommitteeData.map((item, index) => (
        <div key={index} className="relative px-4 py-6 sm:px-6 lg:px-12">
          <div className="flex flex-col justify-center py-6 lg:py-12">
            <h2 className="font-orbitron text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
              <span className="text-quarternary">{item.title}</span>
              &nbsp;Committee
            </h2>

            <div className="mt-2 h-[0.2rem] w-[15%] bg-gradient-to-r from-secondary to-transparent"></div>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {item.details.map((info, index) => (
                <motion.div key={index} variants={itemVariant}>
                  <CommitteeCard info={info} title={item.title} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {index !== CommitteeData.length - 1 ? (
            <div className="relative left-1/2 right-1/2 -ml-[50vw] mt-2 w-screen">
              <TextMarquee type="techletics" bg="black" text="tertiary" />
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
