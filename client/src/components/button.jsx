import React from "react";

const Button = ({ title, handleClick }) => {
  return (
    <button className="toggle-button" onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
