import Gallery from './gallery';

const Legacy = () => {
  return (
    <div>
      <div
        className="font-primary mt-4 flex flex-col justify-center gap-12 px-4 py-2 text-secondary sm:px-8 sm:py-4 lg:px-16 lg:py-9"
        id="legacy"
      >
        <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
          Techletics Legacy&nbsp;
        </h2>
        <div className="mb-6 sm:mb-12 lg:mb-0">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Join us for the&nbsp;
            <span className="font-semibold text-primary">
              fourth edition of Techletics &apos;25
            </span>
            &nbsp;at Christ College of Engineering.&nbsp;
            <span className="font-semibold text-primary">
              Experience the latest technology and innovations in various fields
              of engineering.&nbsp;
            </span>
            Engage with industry experts, network with peers, and gain valuable
            insights into the future of technology. Participate in exciting
            competitions, workshops, and interactive sessions. Expand your
            knowledge, enhance your skills, and be a part of the vibrant tech
            community at Christ College of Engineering.&nbsp;
            <span className="font-semibold text-primary">
              Don&apos;t miss this opportunity to explore and be inspired by the
              ever-evolving world of engineering.&nbsp;
            </span>
          </p>
        </div>
        <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
          This is a&nbsp;
          <span className="font-semibold text-primary">
            3-day long techno-cultural techfest&nbsp;
          </span>
          organized by Christ College of Engineering, Irinjalakuda from&nbsp;
          <span className="font-semibold text-primary">[Date TBD]&nbsp;</span>
          2025. The techfest aims to provide a&nbsp;
          <span className="font-semibold text-primary">
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

      <div className="py-6 lg:pb-12">
        <Gallery />
      </div>
    </div>
  );
};

export default Legacy;
