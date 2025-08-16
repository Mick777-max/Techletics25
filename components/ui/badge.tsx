import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        destructive:
          "border-transparent bg-red-600 text-white relative overflow-hidden",
        shinyWhite:
          "border-transparent bg-white text-gray-800 relative overflow-hidden"
      },
      shiny: {
        true: "relative overflow-hidden",
        false: ""
      }
    },
    defaultVariants: {
      variant: "shinyWhite",
      shiny: false
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  shiny?: boolean;
  shinySpeed?: number;
}

function Badges({
  className,
  variant,
  shiny = false,
  shinySpeed = 5,
  children,
  ...props
}: BadgeProps) {
  const animationDuration = `${shinySpeed}s`;

  return (
    <div
      className={cn(badgeVariants({ variant, shiny }), className)}
      {...props}
    >
      <span className={shiny || variant === "shinyWhite" ? "relative z-10" : ""}>{children}</span>

      {(shiny || variant === "shinyWhite") && (
        <span
          className="absolute inset-0 pointer-events-none animate-shine"
          style={{
            background: variant === "shinyWhite" 
              ? "linear-gradient(120deg, transparent 40%, rgba(59, 130, 246, 0.5) 50%, transparent 60%)"
              : "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animationDuration,
            backgroundPosition: "100%"
          }}
        />
      )}

      {shiny && variant !== "shinyWhite" && (
        <span
          className="absolute inset-0 pointer-events-none animate-shine hidden dark:block"
          style={{
            background: variant === "destructive" 
              ? "linear-gradient(120deg, transparent 40%, rgba(59, 130, 246, 0.5) 50%, transparent 60%)"
              : "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animationDuration,
            mixBlendMode: "multiply"
          }}
        />
      )}
    </div>
  );
}

export { Badges, badgeVariants };