import React from "react";

const FormInput = ({
  type,
  placeholder,
  label,
  id,
  name,
  isTextarea,
  required,
}) => {
  return (
    <div className="flex flex-col mt-6 w-full ">
      <label className="text-sm" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          className={` border px-4 py-2 mt-2 rounded-sm outline-none focus:border-[var(--mint)] transition-all duration-200`}
          name={name}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={` border px-4 py-2 mt-2 rounded-sm outline-none focus:border-[var(--mint)] transition-all duration-200`}
          name={name}
          required={required}
        />
      )}
    </div>
  );
};

export default FormInput;
