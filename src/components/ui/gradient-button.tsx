"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("gradient-btn", className)}
        {...props}
      >
        <span className="gradient-btn-inner">{children}</span>
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
