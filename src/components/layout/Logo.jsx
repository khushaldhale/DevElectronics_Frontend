import React from "react";
import { Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logo = ({ className = "", size = "md", colorScheme = "dark" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };
  const navigate = useNavigate();

  const colorClasses = {
    light: "text-white",
    dark: "text-primary",
  };

  return (
    <div
      onClick={() => {
        navigate("/");
      }}
      className={`d-flex align-items-center ${className}`}
      style={{ cursor: "pointer" }}
    >
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
