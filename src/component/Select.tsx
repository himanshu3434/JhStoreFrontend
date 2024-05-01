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
      <select className="text-black" id={id} {...props} ref={ref}>
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
