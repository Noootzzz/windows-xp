import React from "react";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

export const ToolbarButton = ({ icon, title, active, onClick }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center ${
        active
          ? "bg-[#333] border border-[#ccff00] shadow-inner text-[#ccff00]"
          : "border border-transparent hover:border-[#ccff00] hover:bg-[#333] hover:shadow-sm text-gray-400 hover:text-[#ccff00]"
      } active:bg-black`}
      title={title}
    >
      {icon}
    </button>
  );
};

interface ToolbarProps {
  children: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export const Toolbar = ({ children, position = "right", className = "" }: ToolbarProps) => {
  const positionClasses = {
    left: "w-10 border-r",
    right: "w-10 border-l",
    top: "h-10 border-b flex-row",
    bottom: "h-10 border-t flex-row",
  };

  return (
    <div
      className={`bg-[#252525] flex items-center py-2 gap-2 border-[#333] ${
        position === "top" || position === "bottom" ? "px-2" : "flex-col"
      } ${positionClasses[position]} ${className}`}
    >
      {children}
    </div>
  );
};
