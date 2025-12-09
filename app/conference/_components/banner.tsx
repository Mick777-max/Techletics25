import Image from 'next/image';

export default function Banner() {
  return (
    <section className="relative mx-auto flex max-w-screen-2xl items-center justify-center overflow-clip px-12 py-5">
      <div className="flex w-[64rem] items-center justify-center p-2 pt-[1rem] font-orbitron text-4xl font-extrabold tracking-wide text-secondary sm:justify-between md:pt-[6rem] md:text-7xl">
        <div className="flex flex-col items-center justify-center max-sm:mt-[6rem]">
          <span className="mr-4 bg-gradient-to-r from-[#D4AF40] via-[#FFF7DB] to-[#D4AF40] bg-clip-text text-transparent">
            CONFERENCES
          </span>

          <div className="hidden h-[8rem] w-full justify-center sm:flex">
            <Image
              className="h-full w-auto"
              src="/icons/golden-ticket.png"
              alt="ticket"
              width={300}
              height={200}
            />
          </div>

          <div className="flex h-[7rem] flex-shrink-0 items-center justify-center sm:hidden">
            <Image
              className="h-full w-auto"
              src="/icons/mic.png"
              alt="ticket"
              width={300}
              height={200}
            />
          </div>
        </div>

        <div className="hidden h-full flex-shrink-0 sm:block">
          <Image
            className="h-full w-auto"
            src="/icons/mic.png"
            alt="ticket"
            width={300}
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
