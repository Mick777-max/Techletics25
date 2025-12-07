import Link, { LinkProps } from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  target?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  className,
  target,
  ...props
}) => {
  return (
    <Link {...props} className={className} target={target}>
      {children}
    </Link>
  );
};

export default CustomLink;
