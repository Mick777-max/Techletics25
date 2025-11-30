const Legacy = () => {
  return (
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
              Experience the latest technology and innovations in various fields
              of engineering.&nbsp;
            </span>
            Engage with industry experts, network with peers, and gain valuable
            insights into the future of technology. Participate in exciting
            competitions, workshops, and interactive sessions. Expand your
            knowledge, enhance your skills, and be a part of the vibrant tech
            community at Christ College of Engineering.&nbsp;
            <span className="font-extrabold">
              Don&apos;t miss this opportunity to explore and be inspired by the
              ever-evolving world of engineering.&nbsp;
            </span>
          </p>
        </div>
        <p className="text-base leading-relaxed text-quarternary sm:text-lg">
          This is a&nbsp;
          <span className="font-extrabold">
            3-day long techno-cultural techfest&nbsp;
          </span>
          organized by Christ College of Engineering, Irinjalakuda from&nbsp;
          <span className="font-extrabold">[Date TBD]&nbsp;</span>
          2025. The techfest aims to provide a&nbsp;
          <span className="font-extrabold">
            platform for technical students and develop students and
            people&nbsp;
          </span>
          from all walks of life. It is an opportunity to showcase their skills,
          learn from industry experts, and network with peers. Participants can
          expect a wide range of activities including competitions, workshops,
          and interactive sessions. Techletics &apos;25 is not just about
          technology, but also about fostering creativity, innovation, and
          collaboration.&nbsp;
        </p>
      </div>

      {/* <div className="py-6 lg:pb-12">
        <Gallery />
      </div> */}
    </div>
  );
};

export default Legacy;
