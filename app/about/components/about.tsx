'use client';

import Image from 'next/image';

const About = () => {
  return (
    <div className="relative mx-auto max-w-screen-2xl px-[1.5rem] py-[8rem] sm:px-8 sm:py-4 lg:px-16 lg:py-9">
      <div className="flex flex-wrap items-center justify-between p-2 font-orbitron text-4xl font-extrabold tracking-wide text-quarternary sm:text-5xl md:text-7xl lg:mt-[10rem] xl:mt-[6rem]">
        <span className="mr-4">ABOUT</span>
        <div className="flex gap-1">
          <Image
            src="/icons/barcode.svg"
            width={424}
            height={128}
            alt="Barcode"
            priority
            className="hidden h-[88px] w-auto 2xl:flex 2xl:h-24"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 pt-8 text-center">
        <h1 className="whitespace-normal font-orbitron text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
          CHRIST COLLEGE OF ENGINEERING
        </h1>
        <span className="font-orbitron text-xl text-secondary sm:text-2xl">
          Irinjalakuda, Thrissur, Kerala
        </span>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="z-20 mt-8 flex max-w-[80%] flex-col items-center justify-center font-opensans text-quarternary">
          <div className="mt-8 min-w-56 flex-1 text-justify">
            <p className="text-base leading-relaxed sm:text-lg">
              <span className="font-extrabold">
                Christ College of Engineering (CCE)
              </span>
              , established in 2015, is affiliated to&nbsp;
              <span className="font-extrabold">
                APJ Abdul Kalam Technological University, Thiruvananthapuram
              </span>
              &nbsp;and is recognized by&nbsp;
              <span className="font-extrabold">AICTE, New Delhi</span>. This
              college was founded at a time when starting a new engineering
              college was not considered as a sensible proposition. In its
              decade of existence, exceeding all expectations and proving all
              critics wrong, Christ College of Engineering has managed to create
              ripples on the academic front in the university, so much so that
              today the college is being&nbsp;
              <span className="z-10 font-extrabold">
                recognized as one of the best self-financing engineering
                colleges in Kerala
              </span>
              .
            </p>
          </div>

          <div className="mb-8 mt-8 min-w-56 flex-1 text-justify">
            <p className="text-base leading-relaxed sm:text-lg">
              Staff and students are at the center of this success story. No
              stone is being left unturned in ensuring that along with
              academics,&nbsp;
              <span className="font-extrabold">
                the students get the right amount of exposure required for
                tomorrow&apos;s successful global citizen
              </span>
              , through the various initiatives held at this campus. With the
              kind of transformative learning model in place here, the college
              is well on its way to making a positive impact on our society and
              nation at large.
            </p>
          </div>
        </div>
      </div>

      <div id="legacy" className="h-4"></div>
    </div>
  );
};

export default About;
