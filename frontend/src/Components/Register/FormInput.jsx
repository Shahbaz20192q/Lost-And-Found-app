import React from "react";

const FormInput = ({
  type,
  placeholder,
  label,
  id,
  name,
  isTextarea,
  required,
  value,
}) => {
  return (
    <div className="flex flex-col mt-6 w-full ">
      <label className="text-sm text-gray-600 " htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          className={` border border-gray-400 h-32 text-gray-600 px-4 py-2 mt-2 rounded-sm outline-none focus:border-[var(--mint)] transition-all duration-200`}
          name={name}
          required={required}
          value={value}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={` border border-gray-400 px-4 py-2 mt-2 rounded-sm outline-none focus:border-[var(--mint)] transition-all duration-200`}
          name={name}
          required={required}
          value={value}
        />
      )}
    </div>
  );
};

export default FormInput;
