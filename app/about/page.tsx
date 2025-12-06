import type { Metadata } from 'next';
import Committee from './components/comitee';
import TextMarquee from '@/components/marquee';
import Image from 'next/image';
import SectionSeparatorBottom from '@/components/custom/sectionseparatorbottom';
import SectionSeparatorTop from '@/components/custom/sectionseparatortop';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div className="w-full min-w-80 overflow-clip">
      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <Image
          className="left-[-6.5rem] top-[21rem] z-0 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

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
          className="right-[-7rem] top-[40rem] z-10 hidden opacity-75 lg:absolute lg:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <SectionSeparatorBottom />
      </section>

      <section className="relative bg-[url('/image/bg-white.png')] bg-cover bg-center">
        <SectionSeparatorTop />

        <div className="relative mx-auto max-w-screen-xl px-2">
          <div
            className="font-primary flex flex-col justify-center gap-12 px-4 py-2 text-secondary sm:px-6 sm:py-4 lg:px-12 lg:py-9"
            id="legacy"
          >
            <h2 className="font-orbitron text-3xl font-bold sm:text-4xl lg:text-5xl">
              <span className="text-quarternary">TECHLETICS</span>{' '}
              <span className="text-secondary">LEGACY</span>&nbsp;
              <div className="mt-2 h-[0.3rem] w-[20%] bg-gradient-to-r from-secondary to-transparent"></div>
            </h2>

            <div className="mb-6 font-opensans font-extralight sm:mb-12 lg:mb-0">
              <p className="text-base leading-relaxed text-quarternary sm:text-lg">
                Join us for the&nbsp;
                <span className="font-extrabold">
                  fourth edition of Techletics &apos;25
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
            <p className="text-base leading-relaxed text-quarternary sm:text-lg">
              This is a&nbsp;
              <span className="font-extrabold">
                3-day long techno-cultural techfest&nbsp;
              </span>
              organized by Christ College of Engineering, Irinjalakuda
              from&nbsp;
              <span className="font-extrabold">[Date TBD]&nbsp;</span>
              2025. The techfest aims to provide a&nbsp;
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

      <TextMarquee bg="secondary" text="black" />

      <section className="relative bg-[url('/image/bg-white.png')] bg-center bg-repeat">
        <Image
          className="left-[-8rem] top-[-1rem] z-0 hidden opacity-75 lg:absolute xl-wide:block"
          src="/logos/techletics-logo.svg"
          alt="name"
          width={400}
          height={400}
        />

        <Committee />
      </section>

      <TextMarquee type="techletics" bg="secondary" text="black" />
    </div>
  );
}
