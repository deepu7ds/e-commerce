import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  loading,
}) => {
  return (
    <button
      className={`w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center ${className} ${
        loading ? "opacity-75 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={loading}
    >
      {children}
      {loading && <img src="/spinner.svg" />}
    </button>
  );
};

export default Button;
