import Image from 'next/image';

export default function HomeAbout() {
  return (
    <main className="relative mx-auto flex h-auto max-w-screen-xl flex-col items-start overflow-hidden pb-[12.5rem] max-md:items-center">
      <div className="text-3xl md:text-5xl">
        <h1 className="pt-10 font-orbitron font-medium text-quarternary max-xl-wide:mx-3 md:pt-20">
          ARE YOU A{' '}
          <span className="text-secondary">TECH ENTHUSIAST?{'  '}</span>THEN{' '}
          <span className="text-secondary">TECHLETICS &apos;25</span> IS FOR
          YOU.
        </h1>
      </div>

      <div className="flex max-w-[90%] items-center justify-center max-md:flex-col">
        <div className="flex-shrink-0">
          <Image
            src="/logos/techletics-logo.svg"
            alt="logo"
            width={500}
            height={500}
            className="h-auto w-[380px]"
          />
        </div>

        <div className="max-md:mx-3">
          <p className="font-opensans text-[1.25rem] font-semibold text-quarternary">
            Join us for the third edition of Techletics, the techno-cultural
            festival of Christ College of Engineering. Explore, learn, and enjoy
            the latest innovations and trends in technology and culture.
            Participate in workshops, competitions, exhibitions, performances,
            and more. Win prizes and awards. Ignite your passion, inspire your
            future and illuminate your mind. Techletics &apos;24 is the ultimate
            rendezvous of innovation and zest. Don&apos;t miss it.
          </p>
          <p className="pt-5 font-opensans text-[1.125rem] text-quarternary">
            Techletics &apos;24 is a techno-cultural techfest organized by
            Christ College of Engineering, Irinjalakuda in 2024. The techfest
            aims to provide a platform for technical students and develop
            students and people from all walks of life
          </p>
        </div>
      </div>
    </main>
  );
}
