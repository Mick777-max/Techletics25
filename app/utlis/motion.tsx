import { Variants } from 'framer-motion';

export const textVariant = (delay: number): Variants => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (
  direction: 'left' | 'right' | 'up' | 'down' | '',
  type: 'spring' | 'tween' | 'inertia',
  delay: number,
  duration: number,
): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: 'easeOut',
      },
    },
  };
};

export const zoomIn = (
  delay: number,
  duration: number,
  // pos: 0 | number
): Variants => {
  return {
    hidden: {
      scale: 0.7,
      opacity: 1,
      // x: -pos,
      // y: pos
    },
    show: {
      // x:0,
      // y:0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay: delay,
        duration: duration,
        ease: 'easeOut',
      },
    },
  };
};

export const slideIn = (
  direction: 'left' | 'right' | 'up' | 'down' | '',
  type: 'spring' | 'tween' | 'inertia',
  delay: number,
  duration: number,
): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: 'easeOut',
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.3, delayChildren = 0) => {
  return {
    hidden: { opacity: 0, y: 50 }, // For example, start offset
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };
};

export const container = {
  initial: {},
  exit: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
} as const;

export const exitItem: Variants = {
  initial: { y: 0, opacity: 1 },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      y: {
        duration: 1.2,
        ease: 'easeInOut',
      },
      opacity: {
        delay: 2,
      },
    },
  },
};

export const zoomOutAndExit: Variants = {
  hidden: {
    scale: 2,
    opacity: 1,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay: 0,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      y: {
        duration: 1.2,
        delay: 0.8,
        ease: 'easeInOut',
      },
      opacity: {
        delay: 2,
      },
    },
  },
};
