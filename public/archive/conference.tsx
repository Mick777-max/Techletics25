// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';

// export default function Conference() {
//   return (
//     <div className="relative mx-auto min-h-screen w-full max-w-screen-2xl overflow-hidden bg-black">
//       {/* Subtle Dark Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute left-1/4 top-20 h-72 w-72 animate-pulse rounded-full bg-gray-900/20 blur-3xl"></div>
//         <div className="absolute bottom-40 right-1/3 h-96 w-96 animate-pulse rounded-full bg-gray-800/15 blur-3xl delay-1000"></div>
//         <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-900/10 blur-3xl"></div>
//       </div>

//       <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
//           className="mb-16 text-center"
//         >
//           <motion.h1
//             className="mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text pt-10 text-6xl font-black text-transparent md:text-7xl"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//           >
//             CHRIST COLLEGE OF ENGINEERING
//           </motion.h1>
//           <motion.h2
//             className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//           >
//             INTERNATIONAL CONFERENCE
//           </motion.h2>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: 200 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="mx-auto mb-8 h-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//           />
//         </motion.div>

//         {/* Conference Description */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="mx-auto mb-16 max-w-4xl text-center"
//         >
//           <p className="text-lg leading-relaxed text-gray-300">
//             Join us for the Conference Presentation at Christ College of
//             Engineering. Discover the latest research and advancements in
//             various fields of engineering. Engage with industry experts, network
//             with peers, and gain valuable insights into the future of
//             technology. Participate in interactive sessions, panel discussions,
//             and technical workshops. Expand your knowledge, enhance your skills,
//             and be a part of the academic community at Christ College of
//             Engineering. Don&apos;t miss this opportunity to be inspired and
//             stay ahead in the ever-evolving world of engineering.
//           </p>
//         </motion.div>

//         {/* Last Date to Register */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="mb-16 text-center"
//         >
//           <div className="inline-block rounded-2xl border border-red-500/50 bg-gradient-to-r from-red-600 to-red-800 p-8 shadow-2xl">
//             <h3 className="mb-2 text-2xl font-bold text-white">
//               Last Date to Register
//             </h3>
//             <div className="text-5xl font-black text-red-100">
//               15th February
//             </div>
//           </div>
//         </motion.div>

//         {/* Conference Roadmap */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//           className="mb-16"
//         >
//           <h3 className="mb-8 text-center text-3xl font-bold text-white">
//             Conference Roadmap
//           </h3>
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {[
//               { date: '15th February', event: 'Abstract Submission Closes' },
//               { date: '20th February', event: 'Intimation of Acceptance' },
//               {
//                 date: '22nd February',
//                 event:
//                   'Camera-ready paper & final registration (including fee payment)',
//               },
//               { date: '25th February', event: 'Submission of Presentation' },
//               {
//                 date: '28th February',
//                 event: 'Presentation (Hybrid - Offline/Online)',
//               },
//               { date: '29th February', event: 'Results & Awards Distribution' },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
//                 className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-gray-700/80"
//               >
//                 <div className="mb-2 text-2xl font-bold text-blue-400">
//                   {item.date}
//                 </div>
//                 <div className="text-gray-300">{item.event}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Submission Guidelines */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.0, duration: 0.6 }}
//           className="mb-16"
//         >
//           <h3 className="mb-8 text-center text-3xl font-bold text-white">
//             Submission Guidelines
//           </h3>
//           <div className="mx-auto max-w-4xl rounded-2xl border border-gray-800/50 bg-gray-900/60 p-8 backdrop-blur-xl">
//             <div className="space-y-4 text-center">
//               <div className="text-lg text-gray-300">
//                 Abstract can contain a maximum of 150 words
//               </div>
//               <div className="text-lg text-gray-300">
//                 Abstract should be in IEEE format
//               </div>
//               <div className="mt-6 text-xl font-semibold text-green-400">
//                 Selected paper will be published in conference proceedings
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Submit Abstract Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.6 }}
//           className="mb-16 text-center"
//         >
//           <h3 className="mb-4 text-3xl font-bold text-white">
//             Submit Your Abstract
//           </h3>
//           <p className="mx-auto mb-8 max-w-2xl text-gray-300">
//             Submit your conference & be a part of the academic community at
//             Christ College of Engineering.
//           </p>
//           <Link href="/register">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
//             >
//               Submit Abstract
//             </motion.button>
//           </Link>
//         </motion.div>

//         {/* Department Posters */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.4, duration: 0.6 }}
//           className="mb-16"
//         >
//           <h3 className="mb-8 text-center text-3xl font-bold text-white">
//             Department Conferences
//           </h3>
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {[
//               { name: 'ICCCD', department: 'CSE', poster: 'ICCCD Poster' },
//               { name: 'ICCCE', department: 'EEE', poster: 'ICCCE Poster' },
//               { name: 'ICEMME', department: 'ME', poster: 'ICEMME Poster' },
//               { name: 'ICRCET', department: 'ECE', poster: 'ICRCET Poster' },
//               { name: 'ICICE', department: 'CE', poster: 'ICICE Poster' },
//               { name: 'ICICBLH', department: 'BSH', poster: 'ICICBLH Poster' },
//             ].map((dept, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
//                 className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-gray-700/80"
//               >
//                 <div className="mb-2 text-3xl font-bold text-blue-400">
//                   {dept.name}
//                 </div>
//                 <div className="mb-4 text-xl text-gray-300">
//                   {dept.department}
//                 </div>
//                 <div className="text-sm text-gray-500">{dept.poster}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Want to Know More Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.8, duration: 0.6 }}
//           className="mb-16 text-center"
//         >
//           <h3 className="mb-4 text-3xl font-bold text-white">
//             Want to KNOW MORE?
//           </h3>
//           <p className="mb-6 text-gray-300">Connect with us.</p>
//           <div className="flex justify-center space-x-8">
//             <div className="text-center">
//               <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800"></div>
//               <div className="text-gray-400">cce.edu.in</div>
//             </div>
//             <div className="text-center">
//               <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800"></div>
//               <div className="text-gray-400">+91 9400336647</div>
//               <div className="text-gray-400">+91 9072809994</div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Follow Us Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 2.0, duration: 0.6 }}
//           className="text-center"
//         >
//           <h3 className="mb-6 text-2xl font-bold text-white">FOLLOW US</h3>
//           <div className="flex justify-center space-x-6">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800"></div>
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800"></div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Conference() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center bg-quarternary px-[1.8rem] pt-[8rem] font-orbitron">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-secondary/10 absolute left-1/4 top-20 h-72 w-72 animate-pulse rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/3 h-96 w-96 animate-pulse rounded-full bg-amber-400/10 blur-3xl delay-1000" />
        <div className="bg-secondary/5 animate-spin-slow absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl" />
      </div>


      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <h1 className="text-5xl font-bold text-secondary drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] md:text-7xl">
            CHRIST COLLEGE OF ENGINEERING
          </h1>
          <h2 className="mt-4 text-3xl font-semibold text-tertiary md:text-5xl">
            INTERNATIONAL CONFERENCE 2025
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-48 bg-gradient-to-r from-secondary via-amber-400 to-secondary" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed tracking-wide text-quarternary"
        >
          Join us for the International Conference at Christ College of
          Engineering, featuring research presentations, interactive sessions,
          and academic discussions across diverse engineering domains. Connect
          with experts, explore new ideas, and expand your knowledge in an
          intellectually vibrant environment.
        </motion.p>

        {/* Last Date to Register */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-tertiary/10 mx-auto mt-16 inline-block rounded-xl border border-secondary px-8 py-6 shadow-[0_0_20px_rgba(255,215,0,0.15)]"
        >
          <h3 className="text-2xl font-semibold text-secondary">
            Last Date to Register
          </h3>
          <p className="mt-2 text-4xl font-bold text-quarternary">
            15th February 2025
          </p>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <h3 className="mb-8 text-3xl font-bold text-secondary">
            Conference Roadmap
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { date: '15th Feb', event: 'Abstract Submission Closes' },
              { date: '20th Feb', event: 'Intimation of Acceptance' },
              {
                date: '22nd Feb',
                event: 'Camera-ready paper & Final Registration',
              },
              { date: '25th Feb', event: 'Submission of Presentation' },
              { date: '28th Feb', event: 'Conference Presentation (Hybrid)' },
              { date: '29th Feb', event: 'Results & Awards Distribution' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-tertiary/10 rounded-lg border border-gray-700 p-5 shadow-md transition-all hover:shadow-[0_0_15px_rgba(255,215,0,0.15)]"
              >
                <h4 className="text-2xl font-semibold text-secondary">
                  {item.date}
                </h4>
                <p className="mt-1 text-quarternary">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submission Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-tertiary/10 mx-auto mt-20 max-w-4xl rounded-xl border border-gray-700 p-8 text-center shadow-[0_0_15px_rgba(255,215,0,0.1)]"
        >
          <h3 className="mb-6 text-3xl font-bold text-secondary">
            Submission Guidelines
          </h3>
          <ul className="space-y-3 text-quarternary">
            <li>• Abstract can contain a maximum of 150 words.</li>
            <li>• Abstract should follow IEEE format.</li>
            <li className="pt-2 font-semibold text-green-400">
              Selected papers will be published in conference proceedings.
            </li>
          </ul>
        </motion.div>

        {/* Submit Abstract CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-3xl font-bold text-secondary">
            Submit Your Abstract
          </h3>
          <p className="mb-8 text-quarternary">
            Be a part of this international gathering of innovation and
            research.
          </p>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-secondary px-8 py-3 text-xl font-semibold text-quarternary shadow-md transition-all hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:brightness-125"
            >
              Submit Abstract
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
