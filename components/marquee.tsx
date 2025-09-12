import clsx from 'clsx';
import Marquee from 'react-fast-marquee';

interface TextMarqueeProps {
  textColor?: 'light' | 'dark';
  type?: 'primary' | 'secondary';
  bgColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quarternary'
    | 'transparent';
}

const TextMarquee = ({
  textColor = 'light',
  type = 'primary',
  bgColor = 'primary',
}: TextMarqueeProps) => {
  return (
    <section
      className={clsx('w-full min-w-80 overflow-visible', {
        'bg-primary': bgColor === 'primary',
        'bg-secondary': bgColor === 'secondary',
        'border-b border-secondary border-opacity-30 bg-tertiary':
          bgColor === 'tertiary',
        'bg-quarternary': bgColor === 'quarternary',
        'bg-transparent': bgColor === 'transparent',
      })}
    >
      <Marquee>
        {[...Array(10)].map((index) =>
          type === 'primary' ? (
            <div
              key={index}
              className={clsx('font-primary py-1 text-7xl', {
                'text-tertiary': textColor === 'light',
                'text-primary': textColor === 'dark',
              })}
            >
              <div className="relative flex items-center justify-center gap-5">
                <span className="ml-5 text-white">✦</span>
                <span
                  className="pt-2 font-secondary font-extrabold text-white"
                  style={{
                    WebkitTextStroke: '3px black',
                  }}
                >
                  TECHLETICS&apos; 25
                </span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="flex items-center justify-center gap-5 py-2 pt-3 font-secondary text-7xl font-extrabold text-white"
            >
              <span className="ml-5">✦</span>
              <span
                style={{
                  WebkitTextStroke: '3px black',
                }}
              >
                IGNITE
              </span>
              <span>✦</span>
              <span
                style={{
                  WebkitTextStroke: '3px black',
                }}
              >
                INSPIRE
              </span>
              <span>✦</span>
              <span
                style={{
                  WebkitTextStroke: '3px black',
                }}
              >
                ILLUMINATE
              </span>
            </div>
          ),
        )}
      </Marquee>
    </section>
  );
};

export default TextMarquee;
