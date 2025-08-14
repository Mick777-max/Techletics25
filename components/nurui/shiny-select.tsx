"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* --------- ShinyOption Component --------- */
export const ShinyOption = ({
  value,
  children,
  className = "",
  ...props
}: {
  value: string;
  children: ReactNode;
  className?: string;
  [key: string]: React.OptionHTMLAttributes<HTMLOptionElement>[keyof React.OptionHTMLAttributes<HTMLOptionElement>];
}) => {
  return (
    <option
      value={value}
      className={cn(
        "text-white bg-[#0d0e1e] hover:bg-[#1c1e30] hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </option>
  );
};

/* --------- ShinySelect Component --------- */
const ShinySelect = ({
  className,
  icon,
  placeholder,
  name,
  required,
  children,
  value,
  onChange,
  borderHoverAnimation = "1px solid #3ca2fa",
  focus = "focus:border-[#3ca2fa]",
  suppressHydrationWarning,
  ...props
}: {
  className?: string;
  icon?: ReactNode;
  placeholder?: string;
  name?: string;
  required?: boolean;
  children?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  borderHoverAnimation?: string;
  focus?: string;
  suppressHydrationWarning?: boolean;
  [key: string]: React.SelectHTMLAttributes<HTMLSelectElement>[keyof React.SelectHTMLAttributes<HTMLSelectElement>] | string | boolean | ReactNode | ((e: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
}) => {
  const divRef = useRef<HTMLSelectElement | null>(null);
  const [, setIsFocused] = useState(false);
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLSelectElement>) => {
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
      `radial-gradient(30% 30px at ${x}px ${y}px, black 45%, transparent)`
  );

  return (
    <div className={cn("relative z-40", className)}>
      {/* MAIN SELECT */}
      <select
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        suppressHydrationWarning={suppressHydrationWarning}
        className={cn(
          `h-12 w-full cursor-pointer rounded-md border border-[#0d0e1e] 
           bg-[#0d0e1e] p-3.5 text-[#fff] transition-colors duration-500 
           placeholder:text-[#8f99b1] ${focus} focus:outline-none`
        )}
        {...props}
      >
        {/* Placeholder only as default */}
        <ShinyOption value="">{placeholder}</ShinyOption>
        {children}
      </select>

      {/* SHINE OVERLAY SELECT (Decorative Only) */}
      <motion.select
        ref={divRef}
        disabled
        value={value} // ✅ mirror real select's value
        style={{
          border: borderHoverAnimation,
          opacity,
          WebkitMaskImage: shineBorder,
          maskImage: shineBorder,
        }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 
                   h-12 w-full cursor-default rounded-md border
                   border-[#80eeb4] bg-transparent p-3.5 opacity-0 
                   transition-opacity duration-500"
      >
        <ShinyOption value="">{placeholder}</ShinyOption>
        {children}
      </motion.select>

      {icon}
    </div>
  );
};

export default ShinySelect;
