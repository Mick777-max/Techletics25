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
