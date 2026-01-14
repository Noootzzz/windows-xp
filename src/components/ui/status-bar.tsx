import React from "react";

interface StatusBarProps {
  children: React.ReactNode;
  className?: string;
}

export const StatusBar = ({ children, className = "" }: StatusBarProps) => {
  return (
    <div
      className={`h-6 border-t border-[#333] mt-1 flex items-center px-2 text-xs text-gray-500 shadow-[inset_0_1px_0_#222] ${className}`}
    >
      {children}
    </div>
  );
};
