export default function LastDate() {
  return (
    <section className="min-w-screen relative mx-auto flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#edddb0] via-[#f4efda] to-[#edddb0] py-[5rem]">
      <div className="text-wrap text-center font-orbitron text-[2rem] font-bold text-[#937109]">
        LAST DATE TO REGISTER
      </div>

      <div className="flex flex-col items-center justify-center gap-0 font-mono text-[4rem] font-bold leading-none md:flex-row md:gap-2 md:text-[6rem]">
        <div className="mr-4 flex items-center justify-center">
          <div>15</div>
          <div className="text-[2rem]">th</div>
        </div>

        <div>FEBRUARY</div>
      </div>
    </section>
  );
}
