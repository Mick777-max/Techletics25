import { MouseEventHandler, ReactNode, ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default CustomButton;
