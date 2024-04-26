import React from "react";

const Button: React.FC<{
  color: string;
  onClick: () => void;
  disabled: boolean;
  highlighted: boolean;
}> = ({ color, onClick, disabled, highlighted }) => (
  <button
    className={`w-64 h-64 m-2 rounded-full ${
      highlighted ? `bg-${color}-700` : `bg-${color}-500`
    }`}
    onClick={onClick}
    disabled={disabled}
  />
);

export default Button;
