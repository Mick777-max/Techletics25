'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  className?: string;
  children: ReactNode;
}

interface StaggeredChildProps {
  key: number;
  className?: string;
  children: ReactNode;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

export default function StaggerChildren({
  className,
  children,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredChild({ className, children }: StaggeredChildProps) {
  return (
    <motion.div variants={itemVariant} className={className}>
      {children}
    </motion.div>
  );
}
