'use client';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/app/utlis/motion';
import Image from 'next/image';
import SectionLayout from '@/layouts/section-layout';

const starPositions = [
  { top: '5%', left: '10%' },
  { top: '12%', left: '50%' },
  { top: '20%', left: '30%' },
  { top: '25%', left: '70%' },
  { top: '32%', left: '15%' },
  { top: '40%', left: '60%' },
  { top: '45%', left: '80%' },
  { top: '50%', left: '25%' },
  { top: '55%', left: '90%' },
  { top: '60%', left: '40%' },
  { top: '65%', left: '5%' },
  { top: '70%', left: '50%' },
  { top: '75%', left: '35%' },
  { top: '80%', left: '75%' },
  { top: '85%', left: '20%' },
  { top: '90%', left: '60%' },
  { top: '95%', left: '10%' },
];

export default function Stats() {
  return (

    <div className="relative mx-auto h-[75vh] max-w-screen-2xl bg-quarternary mb-[6rem] max-cmd:mb-[20rem] max-md:mb-[40rem]">
      {/* <Image
        src="/image/flo.svg"
        alt="flower"
        width={250}
        height={250}
        className="hidden md:absolute md:-top-48 md:left-0 md:block"
      /> */}
      {/* <div className="pt-[210px] overflow-hidden">
        <div className="-rotate-6 w-[120%] origin-left">
          <TextMarquee bgColor="tertiary" />
        </div>
      </div> */}
      {/* <Image
        src="/logos/logo.png"
        alt="logo"
        width={400}
        height={400}
        className="max-xl:hidden absolute top-[-210px] right-[-150px]"
      /> */}

      {/* Stars (Sparklers) */}
      {/* {starPositions.map((pos, index) => (
        <Image
          key={index}
          src="/icons/diamondw.svg"
          alt="Spark icon"
          width={20}
          height={20}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            opacity: 0.8, // subtle effect
            transform: 'rotate(0deg)', // Optional slight rotation if desired
          }}
        />
      ))} */}

      <div className="max-md:hidden max-cmd:top-[260px] max-cmd:left-[40px] z-30 cursor-pointer absolute top-[30px] right-[400px] w-[270px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              20+ WORKSHOPS
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-md:hidden max-cmd:top-[-20px] max-cmd:right-[40px] z-30 cursor-pointer absolute right-[40px] w-[160px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              60+ TECH EVENTS
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-md:hidden max-cmd:bottom-[-100px] max-cmd:left-[40px] z-30 cursor-pointer absolute bottom-[30px] left-[400px] w-[300px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              20+ TECH EXPERTS
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-md:hidden max-cmd:bottom-[260px] max-cmd:right-[40px] max-cmd:left-auto z-30 cursor-pointer absolute left-[40px] bottom-[160px] w-[160px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              10+ CULTURAL EVENTS
            </span>
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
        className="flex w-full flex-col max-md:gap-[4rem] gap-[10rem] justify-center cmd:flex-row cmd:h-full cmd:gap-0"
      >

        <div className='md:hidden flex justify-center'>
          <div className="z-30 cursor-pointer w-[160px]">
            <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
              <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
              <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
                <span className="font-secondary text-3xl">
                  60+ TECH EVENTS
                </span>
              </div>
            </motion.div>
          </div>
        </div>


        <div className="cmd:flex-auto flex flex-col justify-start md:pt-[65px]">  {/* Add top padding */}
          <StatCard
            number="35+"
            label="COLLEGES"
            fill="secondary"
            border="#f5f3bd"
          />
        </div>

        

        <div className='md:hidden flex justify-center'>
          <div className="z-30 cursor-pointer w-[270px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              20+ WORKSHOPS
            </span>
          </div>
        </motion.div>
      </div>
        </div>

        <div className="cmd:flex-auto flex flex-col justify-center">
          <StatCard
            number="500k+"
            label="PRIZE POOL"
            fill="secondary"
            border="#f5f3bd"
          />
        </div>

<div className='md:hidden flex justify-center'>
          <div className="z-30 cursor-pointer w-[160px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
              10+ CULTURAL EVENTS
            </span>
          </div>
        </motion.div>
      </div>
        </div>

        <div className="cmd:flex-auto flex flex-col justify-end md:pb-[65px]"> {/* Add bottom padding */}
          <StatCard
            number="10k+"
            label="STUDENTS"
            fill="secondary"
            border="#f5f3bd"
          />
        </div>

        <div className='md:hidden flex justify-center'>
          <div className="z-30 cursor-pointer w-[300px]">
        <motion.div whileHover={{ scale: 1.2 }} className="relative inline-block">
          <div className="border-2 border-black absolute top-2 left-2 w-full h-full bg-secondary rounded-xl"></div>
          <div className="border-2 border-black relative bg-primary p-4 rounded-xl z-[20]">
            <span className="font-secondary text-3xl">
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
  border: string;
};

function StatCard({ number, label, fill, border }: StatCardProps) {
  const textSizeNumber = label === 'PRIZE POOL' ? 'text-[150px] max-md:text-[80px] max-xsm:text-[60px]' : 'text-[100px] max-md:text-[80px] max-xsm:text-[60px]';
  const textSizeLabel = label === 'PRIZE POOL' ? 'text-[100px] max-md:text-[60px] max-xsm:text-[40px]' : 'text-[80px] max-md:text-[60px] max-xsm:text-[40px]';

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="z-30 flex cursor-pointer flex-col items-center gap-0"
    >
      <div className={`relative leading-none text-center font-turret ${textSizeNumber} font-extrabold text-${fill}`}>

        <span
          className={`relative z-10 leading-none text-center font-turret ${textSizeNumber} font-extrabold text-${fill} whitespace-nowrap`}
        >
          {number}
        </span>

        <span
          className={`absolute inset-1 z-0 leading-none text-center font-turret ${textSizeNumber} font-extrabold text-[#f5f2bd] whitespace-nowrap`}
        >
          {number}
        </span>
      </div>

      <div className={`relative leading-none text-center font-turret ${textSizeLabel} text-primary font-extrabold`}>

        <span
          className={`relative z-10 leading-none text-center font-turret ${textSizeLabel} font-extrabold text-${fill} whitespace-nowrap`}
        >
          {label}
        </span>

        <span
          className={`absolute inset-1 z-0 leading-none text-center font-turret ${textSizeLabel} font-extrabold text-[#f5f2bd] whitespace-nowrap`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}