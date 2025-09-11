'use client';

import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

interface CustomTextProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  title?: boolean;
  highlightedTitle?: boolean;
  description?: boolean;
  highlightedDescription?: boolean;
  numeric?: boolean;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  className,
  title = false,
  highlightedTitle = false,
  description = false,
  highlightedDescription = false,
  numeric = false,
}) => {
  let baseClassName = numeric
    ? 'font-secondary font-extrabold '
    : title || highlightedTitle
      ? 'font-primary '
      : 'font-secondary ';

  baseClassName += description
    ? 'font-regular '
    : highlightedDescription
      ? 'font-extrabold '
      : '';

  if (title)
    baseClassName +=
      'text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:max-w-[95%] xl:max-w-[80%] leading-tight tracking-wide flex flex-wrap font-secondary text-quarternary';
  else if (highlightedTitle)
    baseClassName +=
      'text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:max-w-[95%] xl:max-w-[80%] leading-tight tracking-wide flex flex-wrap text-secondary whitespace-nowrap';
  else if (description)
    baseClassName +=
      'text-md md:text-xl lg:text-2xl text-justify text-secondary';
  else if (highlightedDescription)
    baseClassName +=
      'text-md md:text-xl lg:text-2xl text-justify text-secondary';

  return <span className={clsx(baseClassName, className)}>{children}</span>;
};

export default CustomText;
