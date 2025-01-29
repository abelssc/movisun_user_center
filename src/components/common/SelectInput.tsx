import { forwardRef } from 'react';

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <select
        {...props}
        className={
          'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ' +
          className
        }
        ref={ref} // solo pasa el ref aquí
      >
        {children}
      </select>
    );
  }
);

export default SelectInput;
