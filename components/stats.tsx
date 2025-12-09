'use client';
import { motion } from 'framer-motion';

export default function Stats() {
  return (
    <div className="relative mx-auto h-[90vh] max-w-screen-xl">
      <div className="absolute right-[25rem] top-5 z-30 w-[16.875rem] cursor-pointer max-xl-wide:left-10 max-xl-wide:top-64 max-md:hidden">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative inline-block"
        >
          <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
          <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
            <span className="font-orbitron text-3xl">20+ WORKSHOPS</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-10 top-20 z-30 w-40 cursor-pointer max-xl-wide:right-10 max-xl-wide:top-5 max-md:hidden">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative inline-block"
        >
          <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
          <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
            <span className="font-orbitron text-3xl">60+ TECH EVENTS</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-[25rem] z-30 w-[18.75rem] cursor-pointer max-xl-wide:bottom-10 max-xl-wide:left-10 max-md:hidden">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative inline-block"
        >
          <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
          <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
            <span className="font-orbitron text-3xl">20+ TECH EXPERTS</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-40 left-10 z-30 w-40 cursor-pointer max-xl-wide:bottom-64 max-xl-wide:left-auto max-xl-wide:right-10 max-md:hidden">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative inline-block"
        >
          <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
          <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
            <span className="font-orbitron text-3xl">10+ CULTURAL EVENTS</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
          },
        }}
        className="flex w-full flex-col justify-center gap-[10rem] pb-[6rem] max-md:gap-[4rem] xl-wide:h-full xl-wide:flex-row xl-wide:gap-0"
      >
        <div className="flex justify-center md:hidden">
          <div className="z-30 w-40 cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative inline-block"
            >
              <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
              <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
                <span className="font-orbitron text-xl md:text-3xl">
                  60+ TECH EVENTS
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col justify-start md:pt-16 xl-wide:flex-auto">
          {' '}
          {/* Add top padding */}
          <StatCard number="35+" label="COLLEGES" fill="secondary" />
        </div>

        <div className="flex justify-center md:hidden">
          <div className="z-30 w-[16.875rem] cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative inline-block"
            >
              <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
              <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
                <span className="font-orbitron text-xl md:text-3xl">
                  20+ WORKSHOPS
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col justify-center xl-wide:flex-auto">
          <StatCard number="500k+" label="PRIZE POOL" fill="secondary" />
        </div>

        <div className="flex justify-center md:hidden">
          <div className="z-30 w-40 cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative inline-block"
            >
              <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
              <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
                <span className="font-orbitron text-xl md:text-3xl">
                  10+ CULTURAL EVENTS
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col justify-end md:pb-16 xl-wide:flex-auto">
          {' '}
          {/* Add bottom padding */}
          <StatCard number="10k+" label="STUDENTS" fill="secondary" />
        </div>

        <div className="flex justify-center md:hidden">
          <div className="z-30 w-[18.75rem] cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative inline-block"
            >
              <div className="absolute left-2 top-2 h-full w-full rounded-xl border-2 border-black bg-secondary"></div>
              <div className="relative z-[20] rounded-xl border-2 border-black bg-primary p-4">
                <span className="font-orbitron text-xl md:text-3xl">
                  20+ TECH EXPERTS
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

type StatCardProps = {
  number: string;
  label: string;
  fill: string;
};

function StatCard({ number, label, fill }: StatCardProps) {
  const textSizeNumber =
    label === 'PRIZE POOL'
      ? 'text-[100px] max-md:text-[80px] max-xs:text-[60px]'
      : 'text-[80px] max-md:text-[70px] max-xs:text-[60px]';
  const textSizeLabel =
    label === 'PRIZE POOL'
      ? 'text-[70px] max-md:text-[55px] max-xs:text-[40px]'
      : 'text-[70px] max-md:text-[55px] max-xs:text-[40px]';

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="z-30 flex cursor-pointer flex-col items-center gap-0"
    >
      <div
        className={`relative text-center font-turret leading-none ${textSizeNumber} font-extrabold text-${fill}`}
      >
        <span
          className={`relative z-10 text-center font-turret leading-none ${textSizeNumber} font-extrabold text-${fill} whitespace-nowrap`}
        >
          {number}
        </span>

        <span
          className={`absolute inset-1.5 z-0 text-center font-turret leading-none ${textSizeNumber} whitespace-nowrap font-extrabold text-black`}
        >
          {number}
        </span>
      </div>

      <div
        className={`relative text-center font-turret leading-none ${textSizeLabel} font-extrabold text-primary`}
      >
        <span
          className={`relative z-10 text-center font-turret leading-none ${textSizeLabel} font-extrabold text-${fill} whitespace-nowrap`}
        >
          {label}
        </span>

        <span
          className={`absolute inset-1.5 z-0 text-center font-turret leading-none ${textSizeLabel} whitespace-nowrap font-extrabold text-black`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
