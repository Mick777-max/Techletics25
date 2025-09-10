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
      className={clsx(
        'flex w-full min-w-80 items-center justify-center overflow-visible py-2',
        {
          'bg-primary': bgColor === 'primary',
          'bg-secondary': bgColor === 'secondary',
          'border-b border-secondary border-opacity-30 bg-tertiary':
            bgColor === 'tertiary',
          'bg-quarternary': bgColor === 'quarternary',
          'bg-transparent': bgColor === 'transparent',
        },
      )}
    >
      <Marquee>
        {[...Array(10)].map((index) =>
          type === 'primary' ? (
            <div
              key={index}
              className={clsx('font-secondary text-4xl', {
                'text-tertiary': textColor === 'light',
                'text-primary': textColor === 'dark',
              })}
            >
              <p className="flex items-center justify-center gap-3 pt-2 text-white">
                <span
                  className="ml-4 text-white"
                  style={
                    {
                      WebkitTextStroke: '1px #000',
                    } as React.CSSProperties
                  }
                >
                  ✦
                </span>
                <span
                  className="font-extrabold"
                  style={
                    {
                      WebkitTextStroke: '2.5px #000',
                    } as React.CSSProperties
                  }
                >
                  TECHLETICS &apos;25
                </span>
              </p>
            </div>
          ) : (
            <p
              key={index}
              className={clsx(
                'flex gap-3 font-secondary text-4xl md:py-2 md:text-5xl',
                {
                  'text-tertiary': textColor === 'light',
                  'text-primary': textColor === 'dark',
                },
              )}
            >
              <span className="ml-4">◌</span>
              <span>IGNIͲς</span>
              <span>✺</span>
              <span>INSPIRe</span>
              <span>🌞</span>
              <span>ILLUMINⱭͲς</span>
            </p>
          ),
        )}
      </Marquee>
    </section>
  );
};

export default TextMarquee;
