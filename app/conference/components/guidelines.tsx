const guidelines = [
  'Abstract can contain a maximum of 150 words',
  'Abstract can contain a maximum of 150 words',
  'Abstract can contain a maximum of 150 words',
];

export default function Guidelines() {
  return (
    <section className="relative mx-auto max-w-screen-xl items-center justify-center py-[4rem] max-lg:px-3">
      <h1 className="mb-[0.5rem] text-wrap font-orbitron text-3xl font-medium text-primary md:text-5xl">
        SUBMISSION <span className="text-secondary">GUIDELINES</span>
      </h1>

      <div className="mt-8 flex flex-col gap-[2.5rem] font-opensans text-primary">
        {guidelines.map((guideline, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-2 text-wrap rounded-md border border-primary bg-black px-[1.5rem] py-[1.5rem] text-center sm:flex-row sm:gap-8"
            >
              <span className="flex gap-2">
                <span className="hidden sm:block">☀️☀️☀️</span>
                <span>{guideline}</span>
              </span>
              <span>☀️☀️☀️</span>
            </div>
          );
        })}

        <div className="mt-6 flex items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-4 text-wrap rounded-md border border-primary bg-black px-[1.5rem] py-[1.5rem] text-center text-2xl sm:w-[65%] sm:text-3xl">
            <span className="">☀️</span>
            <span className="font-orbitron font-semibold">
              <span className="text-[#A6A6A6]">
                SELECTED PAPER WILL BE PUBLISHED IN
              </span>{' '}
              <span className="text-[#F4E6BE]">CONFERENCE PROCEEDINGS</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
