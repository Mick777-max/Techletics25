'use client';

const About = () => {
  return (
    <div className="bg-college-img h-full w-full bg-cover bg-center bg-no-repeat px-4 py-2 sm:px-8 sm:py-4 lg:px-16 lg:py-9">
      <div className="h-full w-full">
        <div className="flex flex-col items-center justify-center gap-2 pt-8 text-center">
          <h1 className="whitespace-normal text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
            CHRIST COLLEGE OF ENGINEERING
          </h1>
          <span className="font-primary text-xl text-secondary sm:text-2xl">
            Irinjalakuda, Thrissur, Kerala
          </span>
        </div>
        <div className="mt-8 min-w-56 flex-1 text-justify">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            <span className="font-semibold text-primary">
              Christ College of Engineering (CCE)
            </span>
            , established in 2015, is affiliated to&nbsp;
            <span className="font-semibold text-primary">
              APJ Abdul Kalam Technological University, Thiruvananthapuram
            </span>
            &nbsp;and is recognized by&nbsp;
            <span className="font-semibold text-primary">AICTE, New Delhi</span>
            . This college was founded at a time when starting a new engineering
            college was not considered as a sensible proposition. In its decade
            of existence, exceeding all expectations and proving all critics
            wrong, Christ College of Engineering has managed to create ripples
            on the academic front in the university, so much so that today the
            college is being&nbsp;
            <span className="font-semibold text-primary">
              recognized as one of the best self-financing engineering colleges
              in Kerala
            </span>
            .
          </p>
        </div>
        <div className="mb-8 mt-8 min-w-56 flex-1 text-justify">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Staff and students are at the center of this success story. No stone
            is being left unturned in ensuring that along with academics,&nbsp;
            <span className="font-semibold text-primary">
              the students get the right amount of exposure required for
              tomorrow&apos;s successful global citizen
            </span>
            , through the various initiatives held at this campus. With the kind
            of transformative learning model in place here, the college is well
            on its way to making a positive impact on our society and nation at
            large.
          </p>
        </div>
      </div>
      <div id="legacy" className="h-4"></div>
    </div>
  );
};

export default About;
