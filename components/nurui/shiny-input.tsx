'use client';
import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const ShinyInput = ({
  className,
  icon,
  placeholder,
  type,
  name,
  required,
  value,
  onChange,
  borderHoverAnimation = '1px solid #3ca2fa',
  focus = 'focus:border-[#3ca2fa]',
  suppressHydrationWarning,
  ...props
}: {
  className?: string;
  icon?: ReactNode;
  placeholder: string;
  type: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  borderHoverAnimation?: string;
  focus?: string;
  suppressHydrationWarning?: boolean;
  [key: string]:
    | React.InputHTMLAttributes<HTMLInputElement>[keyof React.InputHTMLAttributes<HTMLInputElement>]
    | string
    | boolean
    | ReactNode
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}) => {
  const divRef = useRef<HTMLInputElement | null>(null);
  const [, setIsFocused] = useState(false);
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      positionX.set(e.clientX - rect.left);
      positionY.set(e.clientY - rect.top);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const shineBorder = useTransform(
    [positionX, positionY],
    ([x, y]) =>
      `radial-gradient(30% 30px at ${x}px ${y}px, black 45%, transparent)`,
  );

  return (
    <div className={cn('relative z-40', className)}>
      <input
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        autoComplete="off"
        placeholder={placeholder}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        suppressHydrationWarning={suppressHydrationWarning}
        className={`h-12 w-full cursor-pointer rounded-md border border-[#0d0e1e] bg-[#0d0e1e] p-3.5 text-[#fff] transition-colors duration-500 placeholder:select-none placeholder:text-[#8f99b1] ${focus} focus:outline-none`}
        {...props}
      />

      <motion.input
        type="text"
        ref={divRef}
        disabled
        style={{
          border: borderHoverAnimation,
          opacity,
          WebkitMaskImage: shineBorder,
          maskImage: shineBorder,
        }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border border-[#80eeb4] bg-transparent p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
      />
      {icon}
    </div>
  );
};

export default ShinyInput;
