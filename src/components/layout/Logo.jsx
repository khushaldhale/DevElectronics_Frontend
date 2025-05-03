import React from "react";
import { Volume2 } from "lucide-react";

const Logo = ({ className = "", size = "md", colorScheme = "dark" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const colorClasses = {
    light: "text-white",
    dark: "text-primary",
  };

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <Volume2
        className={`me-2 ${
          colorScheme === "light" ? "text-accent" : "text-accent"
        }`}
        size={size === "sm" ? 20 : size === "md" ? 30 : 40}
      />
      <span
        className={`fw-bold ${sizeClasses[size]} ${colorClasses[colorScheme]}`}
      >
        <span>Dev</span>
        <span className="text-gradient">Electronics</span>
      </span>
    </div>
  );
};

export default Logo;
