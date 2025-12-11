'use client';

import Marquee from 'react-fast-marquee';

interface TextMarqueeProps {
  type?: 'ignite' | 'techletics';
  bg?: 'black' | 'secondary';
  text?: 'white' | 'black' | 'tertiary';
}

const TextMarquee = ({
  type = 'ignite',
  bg = 'black',
  text = 'white',
}: TextMarqueeProps) => {
  const bgColour = 'bg-' + bg;
  const textColour = 'text-' + text;

  return (
    <section
      className={`flex h-16 w-full flex-col items-center overflow-hidden md:h-20 ${bgColour} font-orbitron font-bold ${textColour}`}
    >
      <Marquee speed={60} gradient={false}>
        {[...Array(10)].map((_, index) =>
          type === 'ignite' ? (
            <div
              key={index}
              className="flex items-center justify-center gap-6 py-4 text-3xl tracking-widest md:text-5xl"
            >
              <div>IGNITE</div>
              <span
                className={`text-${text} ${text === 'black' ? 'blackTextBorder' : 'whiteTextBorder'}`}
              >
                ✦
              </span>
              <div>INSPIRE</div>
              <span
                className={`text-${text} ${text === 'black' ? 'blackTextBorder' : 'whiteTextBorder'}`}
              >
                ✦
              </span>
              <div>ILLUMINATE</div>
              <span
                className={`mr-6 text-${text} ${text === 'black' ? 'blackTextBorder' : 'whiteTextBorder'}`}
              >
                ✦
              </span>
            </div>
          ) : (
            <div
              key={index}
              className="flex items-center justify-center gap-6 py-4 text-3xl tracking-widest md:text-5xl"
            >
              <div>TECHLETICS &apos;26</div>
              <span
                className={`mr-6 text-${text} ${text === 'black' ? 'blackTextBorder' : 'whiteTextBorder'}`}
              >
                ✦
              </span>
            </div>
          ),
        )}
      </Marquee>
    </section>
  );
};

import dynamic from 'next/dynamic';

const DynamicTextMarquee = dynamic(
  () => Promise.resolve({ default: TextMarquee }),
  {
    ssr: false,
    loading: () => <div className="h-16 w-full bg-black md:h-20" />,
  },
);

export default DynamicTextMarquee;
