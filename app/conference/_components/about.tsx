import Image from 'next/image';

export default function Conferenceabout() {
  return (
    <main className="relative mx-auto flex h-auto max-w-screen-xl flex-col items-start overflow-hidden pb-[5rem] max-md:items-center">
      <div className="text-3xl md:text-5xl">
        <h1 className="flex flex-col gap-2 pt-10 font-orbitron font-medium max-xl-wide:mx-3 md:pt-20">
          <span className="text-wrap text-quarternary">
            CHRIST COLLEGE OF ENGINEERING
          </span>
          <span className="text-wrap text-secondary">
            INTERNATIONAL CONFERENCE
          </span>
        </h1>
      </div>

      <div className="mt-[4rem] flex w-full items-center justify-between gap-6 max-md:flex-col">
        <div className="max-md:mx-3">
          <p className="font-opensans text-[1.1rem] font-extralight text-quarternary">
            Join us for the{' '}
            <span className="font-bold">Conference Presentation</span> at Christ
            College of Engineering. Discover the latest research and
            advancements in various fields of engineering. Engage with industry
            experts, network with peers, and gain valuable insights into the
            future of technology. Participate in interactive sessions, panel
            discussions, and technical workshops. Expand your knowledge, enhance
            your skills, and be a part of the academic community at Christ
            College of Engineering.{' '}
            <span className="font-bold">
              Don&apos;t miss this opportunity to be inspired and stay ahead in
              the ever-evolving world of engineering.
            </span>{' '}
            Join us for the Conference Presentation at Christ College of
            Engineering.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Image
            src="/icons/conf-paper.png"
            alt="logo"
            width={500}
            height={500}
            className="h-auto w-52"
          />
        </div>
      </div>
    </main>
  );
}
