import { Metadata } from 'next';
import Committee from './components/comitee';
import DynamicTextMarquee from '@/components/custom/marquee';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div className="w-full min-w-80 overflow-clip">
      <section className="relative bg-whiteBg bg-cover bg-center">
        <Image
          className="-left-28 top-80 z-0 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <div className="relative mx-auto max-w-screen-2xl px-6 py-32 sm:px-8 sm:py-4 lg:px-16 lg:py-9">
          <div className="flex flex-wrap items-center justify-between p-2 font-orbitron text-4xl font-extrabold tracking-wide text-quarternary sm:text-5xl md:text-7xl lg:mt-40 xl:mt-24">
            <span className="mr-4">ABOUT</span>
            <div className="flex gap-1">
              <Image
                src="/icons/barcode.svg"
                width={424}
                height={128}
                alt="Barcode"
                priority
                className="hidden h-20 w-auto 2xl:flex 2xl:h-24"
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

          <div className="flex size-full flex-col items-center justify-center font-orbitron">
            <div className="z-20 mt-8 flex max-w-[80%] flex-col items-center justify-center text-quarternary">
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
                  decade of existence, exceeding all expectations and proving
                  all critics wrong, Christ College of Engineering has managed
                  to create ripples on the academic front in the university, so
                  much so that today the college is being&nbsp;
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
                  , through the various initiatives held at this campus. With
                  the kind of transformative learning model in place here, the
                  college is well on its way to making a positive impact on our
                  society and nation at large.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Image
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 opacity-40 lg:hidden"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <Image
          className="-bottom-64 -right-28 z-10 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />
      </section>

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <div className="relative mx-auto max-w-screen-xl px-2">
          <div
            className="font-primary flex flex-col justify-center gap-12 px-4 py-2 text-secondary sm:px-6 sm:py-4 lg:px-12 lg:py-9"
            id="legacy"
          >
            <h2 className="font-orbitron text-3xl font-bold sm:text-4xl lg:text-5xl">
              <span className="text-quarternary">TECHLETICS</span>{' '}
              <span className="text-secondary">LEGACY</span>&nbsp;
              <div className="mt-2 h-1 w-[20%] bg-gradient-to-r from-secondary to-transparent"></div>
            </h2>

            <div className="mb-6 font-orbitron font-extralight sm:mb-12 lg:mb-0">
              <p className="text-base leading-relaxed text-quarternary sm:text-lg">
                Join us for the&nbsp;
                <span className="font-extrabold">
                  fourth edition of Techletics &apos;26
                </span>
                &nbsp;at Christ College of Engineering.&nbsp;
                <span className="font-extrabold">
                  Experience the latest technology and innovations in various
                  fields of engineering.&nbsp;
                </span>
                Engage with industry experts, network with peers, and gain
                valuable insights into the future of technology. Participate in
                exciting competitions, workshops, and interactive sessions.
                Expand your knowledge, enhance your skills, and be a part of the
                vibrant tech community at Christ College of Engineering.&nbsp;
                <span className="font-extrabold">
                  Don&apos;t miss this opportunity to explore and be inspired by
                  the ever-evolving world of engineering.&nbsp;
                </span>
              </p>
            </div>
            <p className="font-orbitron text-base leading-relaxed text-quarternary sm:text-lg">
              This is a&nbsp;
              <span className="font-extrabold">
                3-day long techno-cultural techfest&nbsp;
              </span>
              organized by Christ College of Engineering, Irinjalakuda
              from&nbsp;
              <span className="font-extrabold">February 5th, 6th, 7th</span>
              &nbsp;2026. The techfest aims to provide a&nbsp;
              <span className="font-extrabold">
                platform for technical students and develop students and
                people&nbsp;
              </span>
              from all walks of life. It is an opportunity to showcase their
              skills, learn from industry experts, and network with peers.
              Participants can expect a wide range of activities including
              competitions, workshops, and interactive sessions. Techletics
              &apos;25 is not just about technology, but also about fostering
              creativity, innovation, and collaboration.&nbsp;
            </p>
          </div>
        </div>
      </section>

      <DynamicTextMarquee bg="secondary" text="black" />

      <section className="relative bg-whiteBg bg-center bg-repeat">
        <Image
          className="-left-32 -top-4 hidden opacity-75 lg:absolute xl:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <Committee />
      </section>

      <DynamicTextMarquee type="techletics" bg="secondary" text="black" />
    </div>
  );
}
