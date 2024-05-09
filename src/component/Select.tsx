import React, { forwardRef, useId } from "react";
interface SelectProps {
  options: string[];
  label?: string;
  className?: string;
}
const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { options, label, className = "", ...props },
  ref
) => {
  const id = useId();
  return (
    <div className="">
      {label && <label htmlFor={id}></label>}
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        id={id}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
