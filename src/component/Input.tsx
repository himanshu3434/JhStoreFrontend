import React, { useId, forwardRef } from "react";

type InputProps = React.HTMLProps<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label className="inline-block text-white  pl-1 mt-2" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-slate-200 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
         focus:border-blue-600 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
