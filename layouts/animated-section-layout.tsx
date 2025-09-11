'use client';

import {
  motion,
  Transition,
  TargetAndTransition,
  VariantLabels,
  ViewportOptions,
} from 'framer-motion';
export default function AnimatedSectionLayout({
  initial,
  transition,
  children,
  whileInView,
  viewPort,
  noanimation = true,
}: {
  initial: boolean | TargetAndTransition | VariantLabels;
  transition: Transition;
  children: React.ReactNode;
  whileInView?: TargetAndTransition | VariantLabels;
  viewPort?: ViewportOptions;
  noanimation?: boolean;
}) {
  if (noanimation) {
    return <section>{children}</section>;
  }
  return (
    <motion.section
      className="section"
      initial={initial}
      transition={transition}
      whileInView={whileInView}
      viewport={viewPort}
    >
      {children}
    </motion.section>
  );
}
