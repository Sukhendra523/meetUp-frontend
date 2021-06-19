import React from "react";

const Input = ({
  icon,
  ariaLabel,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="input-group flex-nowrap mb-3">
      <span className="input-group-text" id="addon-wrapping">
        <i className={`fa ${icon}`}></i>
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-describedby="addon-wrapping"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
