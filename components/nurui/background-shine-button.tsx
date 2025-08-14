"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function ModernButton({
  className,
  href,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ModernButtonProps) {
  const baseClasses = cn(
    "relative overflow-hidden font-medium transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "group"
  );

  const variantClasses = {
    primary: cn(
      "bg-blue-900 backdrop-blur-sm border border-blue-400/30 rounded-xl text-white shadow-sm animate-glow"
    ),
    secondary: cn(
      "bg-gray-100 hover:bg-gray-200 text-gray-900",
      "border border-gray-300 hover:border-gray-400",
      "focus:ring-gray-500"
    ),
    outline: cn(
      "bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900",
      "border-2 border-gray-300 hover:border-gray-400",
      "focus:ring-gray-500"
    ),
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const buttonContent = (
    <>
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  return href ? (
    <Link href={href} passHref>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          className={buttonClasses}
          {...props}
        >
          {buttonContent}
        </Button>
      </motion.div>
    </Link>
  ) : (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={buttonClasses}
        {...props}
      >
        {buttonContent}
      </Button>
    </motion.div>
  );
}