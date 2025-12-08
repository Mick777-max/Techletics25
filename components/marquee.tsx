// import clsx from 'clsx';
// import Image from 'next/image';
// import Marquee from 'react-fast-marquee';

// interface TextMarqueeProps {
//   textColor?: 'light' | 'dark';
//   type?: 'primary' | 'secondary';
//   bgColor?:
//     | 'primary'
//     | 'secondary'
//     | 'tertiary'
//     | 'quarternary'
//     | 'transparent';
// }

// const TextMarquee = ({
//   textColor = 'light',
//   type = 'primary',
//   bgColor = 'primary',
// }: TextMarqueeProps) => {
//   return (
//     <section
//       className={clsx('z-50 w-full min-w-80 overflow-visible', {
//         'bg-primary': bgColor === 'primary',
//         'bg-secondary': bgColor === 'secondary',
//         'border-b border-secondary border-opacity-30 bg-tertiary':
//           bgColor === 'tertiary',
//         'bg-quarternary': bgColor === 'quarternary',
//         'bg-transparent': bgColor === 'transparent',
//       })}
//     >
//       <Marquee>
//         {[...Array(10)].map((index) =>
//           type === 'primary' ? (
//             <div
//               key={index}
//               className={clsx('py-2 text-4xl md:text-5xl', {
//                 'text-tertiary': textColor === 'light',
//                 'text-primary': textColor === 'dark',
//               })}
//             >
//               <div className="relative flex items-center justify-center gap-5">
//                 <span
//                   className="ml-5 text-white"
//                   style={{
//                     WebkitTextStroke: '2px black',
//                   }}
//                 >
//                   ✦
//                 </span>
//                 <span>
//                   <Image
//                     src="/icons/techletics25.svg"
//                     alt="Techletics 25"
//                     width={1000}
//                     height={1000}
//                     priority
//                     className="w-56 md:w-72"
//                   />
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <div
//               key={index}
//               className="relative flex items-center justify-center py-2 text-4xl md:text-5xl"
//             >
//               <span
//                 className="ml-5 text-white"
//                 style={{
//                   WebkitTextStroke: '2px black',
//                 }}
//               >
//                 ✦
//               </span>
//               <span>
//                 <Image
//                   src="/icons/ignite.svg"
//                   alt="Techletics 25"
//                   width={1000}
//                   height={1000}
//                   priority
//                   className="h-10 w-40"
//                 />
//               </span>
//               <span
//                 className="text-white"
//                 style={{
//                   WebkitTextStroke: '2px black',
//                 }}
//               >
//                 ✦
//               </span>
//               <span>
//                 <Image
//                   src="/icons/inspire.svg"
//                   alt="Techletics 25"
//                   width={1000}
//                   height={1000}
//                   priority
//                   className="h-10 w-40"
//                 />
//               </span>
//               <span
//                 className="text-white"
//                 style={{
//                   WebkitTextStroke: '2px black',
//                 }}
//               >
//                 ✦
//               </span>
//               <span>
//                 <Image
//                   src="/icons/illuminate.svg"
//                   alt="Techletics 25"
//                   width={1000}
//                   height={1000}
//                   priority
//                   className="ml-5 h-10 w-40"
//                 />
//               </span>
//             </div>
//           ),
//         )}
//       </Marquee>
//     </section>
//   );
// };

// export default TextMarquee;

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
  // const content =
  //   type === 'ignite'
  //     ? ['IGNITE', 'INSPIRE', 'ILLUMINATE']
  //     : ["TECHLETICS '25"];

  return (
    <section
      className={`w-full overflow-hidden bg-${bg} font-orbitron font-bold text-${text}`}
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
                className={`text-${text}`}
                style={{ WebkitTextStroke: '1px ' + text }}
              >
                ✦
              </span>
              <div>INSPIRE</div>
              <span
                className={`text-${text}`}
                style={{ WebkitTextStroke: '1px ' + text }}
              >
                ✦
              </span>
              <div>ILLUMINATE</div>
              <span
                className={`mr-6 text-${text}`}
                style={{ WebkitTextStroke: '1px ' + text }}
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
                className={`mr-6 text-${text}`}
                style={{ WebkitTextStroke: '1px ' + text }}
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

export default TextMarquee;
