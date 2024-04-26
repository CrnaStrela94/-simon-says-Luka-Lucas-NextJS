import React from "react";

const Button: React.FC<{
  color: string;
  onClick: () => void;
  disabled: boolean;
  highlighted: boolean;
}> = ({ color, onClick, disabled, highlighted }) => {
  const colorMapping: { [key: string]: string } = {
    red: highlighted ? 'bg-red-700' : 'bg-red-500',
    blue: highlighted ? 'bg-blue-700' : 'bg-blue-500',
    yellow: highlighted ? 'bg-yellow-700' : 'bg-yellow-500',
    green: highlighted ? 'bg-green-700' : 'bg-green-500',
  };

  return (
    <button
      className={`w-64 h-64 m-2 rounded-full ${colorMapping[color]}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Button;