import React from "react";

const LoginWithButton = ({ site, icon, children }) => {
  return (
    <div className="btn-group my-2" role="group" aria-label="Basic example">
      <div className={`small-btn ${site}`}>
        <i className={`fab ${icon}`}></i>
      </div>
      {children}
    </div>
  );
};

export default LoginWithButton;
