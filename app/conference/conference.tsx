'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Conference() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Subtle Dark Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-20 h-72 w-72 animate-pulse rounded-full bg-gray-900/20 blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 h-96 w-96 animate-pulse rounded-full bg-gray-800/15 blur-3xl delay-1000"></div>
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform animate-spin-slow rounded-full bg-gray-900/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          className="mb-16 text-center"
        >
          <motion.h1
            className="mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text pt-10 text-6xl font-black text-transparent md:text-7xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            CHRIST COLLEGE OF ENGINEERING
          </motion.h1>
          <motion.h2
            className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            INTERNATIONAL CONFERENCE
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mb-8 h-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          />
        </motion.div>

        {/* Conference Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <p className="text-lg leading-relaxed text-gray-300">
            Join us for the Conference Presentation at Christ College of
            Engineering. Discover the latest research and advancements in
            various fields of engineering. Engage with industry experts, network
            with peers, and gain valuable insights into the future of
            technology. Participate in interactive sessions, panel discussions,
            and technical workshops. Expand your knowledge, enhance your skills,
            and be a part of the academic community at Christ College of
            Engineering. Don&apos;t miss this opportunity to be inspired and
            stay ahead in the ever-evolving world of engineering.
          </p>
        </motion.div>

        {/* Last Date to Register */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block rounded-2xl border border-red-500/50 bg-gradient-to-r from-red-600 to-red-800 p-8 shadow-2xl">
            <h3 className="mb-2 text-2xl font-bold text-white">
              Last Date to Register
            </h3>
            <div className="text-5xl font-black text-red-100">
              15th February
            </div>
          </div>
        </motion.div>

        {/* Conference Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-center text-3xl font-bold text-white">
            Conference Roadmap
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { date: '15th February', event: 'Abstract Submission Closes' },
              { date: '20th February', event: 'Intimation of Acceptance' },
              {
                date: '22nd February',
                event:
                  'Camera-ready paper & final registration (including fee payment)',
              },
              { date: '25th February', event: 'Submission of Presentation' },
              {
                date: '28th February',
                event: 'Presentation (Hybrid - Offline/Online)',
              },
              { date: '29th February', event: 'Results & Awards Distribution' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-gray-700/80"
              >
                <div className="mb-2 text-2xl font-bold text-blue-400">
                  {item.date}
                </div>
                <div className="text-gray-300">{item.event}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submission Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-center text-3xl font-bold text-white">
            Submission Guidelines
          </h3>
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-800/50 bg-gray-900/60 p-8 backdrop-blur-xl">
            <div className="space-y-4 text-center">
              <div className="text-lg text-gray-300">
                Abstract can contain a maximum of 150 words
              </div>
              <div className="text-lg text-gray-300">
                Abstract should be in IEEE format
              </div>
              <div className="mt-6 text-xl font-semibold text-green-400">
                Selected paper will be published in conference proceedings
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Abstract Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h3 className="mb-4 text-3xl font-bold text-white">
            Submit Your Abstract
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            Submit your conference & be a part of the academic community at
            Christ College of Engineering.
          </p>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              Submit Abstract
            </motion.button>
          </Link>
        </motion.div>

        {/* Department Posters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-center text-3xl font-bold text-white">
            Department Conferences
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'ICCCD', department: 'CSE', poster: 'ICCCD Poster' },
              { name: 'ICCCE', department: 'EEE', poster: 'ICCCE Poster' },
              { name: 'ICEMME', department: 'ME', poster: 'ICEMME Poster' },
              { name: 'ICRCET', department: 'ECE', poster: 'ICRCET Poster' },
              { name: 'ICICE', department: 'CE', poster: 'ICICE Poster' },
              { name: 'ICICBLH', department: 'BSH', poster: 'ICICBLH Poster' },
            ].map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-gray-700/80"
              >
                <div className="mb-2 text-3xl font-bold text-blue-400">
                  {dept.name}
                </div>
                <div className="mb-4 text-xl text-gray-300">
                  {dept.department}
                </div>
                <div className="text-sm text-gray-500">{dept.poster}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Want to Know More Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h3 className="mb-4 text-3xl font-bold text-white">
            Want to KNOW MORE?
          </h3>
          <p className="mb-6 text-gray-300">Connect with us.</p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800"></div>
              <div className="text-gray-400">cce.edu.in</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800"></div>
              <div className="text-gray-400">+91 9400336647</div>
              <div className="text-gray-400">+91 9072809994</div>
            </div>
          </div>
        </motion.div>

        {/* Follow Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className="text-center"
        >
          <h3 className="mb-6 text-2xl font-bold text-white">FOLLOW US</h3>
          <div className="flex justify-center space-x-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
