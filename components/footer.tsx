import { SocialIcon } from './svg/icons';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const Copyright = () => {
  return (
    <div className="relative mx-auto flex min-h-16 w-full max-w-screen-xl items-center justify-center overflow-hidden border-t-[1px] border-tertiary">
      <div className="absolute mt-2 flex w-full justify-center md:mt-8">
        <span
          className="whitespace-nowrap pt-8 align-middle font-secondary text-8xl leading-none tracking-widest text-transparent opacity-40 md:text-9xl"
          style={{ WebkitTextStroke: '1px rgba(231,230,228,0.4)' }}
        >
          TECHLETICS
        </span>
      </div>
      <div>
        <span className="sm:text-md flex flex-wrap items-center justify-center text-sm text-secondary md:text-lg">
          <span className="whitespace-nowrap font-orbitron text-primary">
            Copyright © 2026&nbsp;
          </span>
          <Link
            href="https://cce.edu.in"
            target="_blank"
            className="z-10 whitespace-nowrap font-orbitron text-secondary"
          >
            Christ College of Engineering.&nbsp;
          </Link>
          <span className="whitespace-nowrap font-orbitron text-primary">
            All Rights Reserved
          </span>
        </span>
      </div>
    </div>
  );
};

const SocialAndConnect = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-screen-2xl overflow-hidden px-3">
      <div className="flex w-full flex-col justify-center gap-12 text-secondary md:p-6 lg:py-12">
        <div className="flex flex-col flex-wrap justify-center gap-0 align-middle font-orbitron text-3xl font-bold text-tertiary md:text-5xl">
          <div className="w-full">
            <span>
              WANT TO <span className="text-secondary">KNOW MORE?</span>
            </span>
          </div>

          <div className="w-full text-tertiary">
            <span>CONNECT WITH US.</span>
          </div>
        </div>

        <div className="flex w-fit flex-col gap-4">
          <p className="w-fit text-justify font-orbitron text-[1.5rem] font-medium text-secondary md:text-[2rem]">
            GET IN TOUCH
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 lg:justify-center lg:gap-12">
            <div className="flex items-center justify-center gap-4">
              <ArrowUpRight className="h-6 w-6 text-white" />
              <Link
                href="https://cce.edu.in/"
                target="_blank"
                className="font-orbitron text-xl font-semibold text-tertiary hover:text-secondary"
              >
                cce.edu.in
              </Link>
            </div>

            <div className="flex gap-4 self-center">
              <ArrowUpRight className="h-6 w-6 text-white" />

              <div className="flex flex-wrap gap-4 font-orbitron text-xl font-extrabold">
                <Link
                  href="tel:+91 9946629072"
                  className="whitespace-nowrap text-tertiary hover:text-secondary"
                >
                  +91 9946629072
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col overflow-clip lg:flex-row lg:justify-end">
        <div className="relative z-0 flex flex-wrap items-center justify-end gap-4 px-12 py-6 md:gap-8 lg:w-1/2 lg:p-12">
          <p className="text-md whitespace-nowrap font-orbitron font-medium text-tertiary lg:text-lg">
            FOLLOW US
          </p>

          <div className="z-[1] flex gap-6">
            <Link
              href="https://www.instagram.com/techleticscce"
              target="_blank"
            >
              <SocialIcon logo="instagram" />
            </Link>

            <Link
              href="https://www.linkedin.com/school/christcollegeofengineering/"
              target="_blank"
            >
              <SocialIcon logo="linkedin" />
            </Link>

            <Link
              href="https://www.linkedin.com/school/christcollegeofengineering/"
              target="_blank"
            >
              <SocialIcon logo="x" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SocialAndConnect, Copyright };
