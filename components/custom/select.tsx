import { MouseEventHandler, ReactNode, SelectHTMLAttributes } from 'react';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLSelectElement>;
  onMouseLeave?: MouseEventHandler<HTMLSelectElement>;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  children,
  className,
  onChange,
  id,
  name,
  ...props
}) => {
  return (
    <select
      {...props}
      onChange={onChange}
      className={className + ' cursor-pointer'}
      id={id}
      name={name}
    >
      {children}
    </select>
  );
};

export default CustomSelect;
