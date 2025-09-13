import { cn } from "@/lib/utils";
import React from "react";

// Define the Props type for the Skeleton component
type Props = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  animated?: boolean;
};

// src/components/ui/Skeleton.tsx (small tweak)
export default function Skeleton({ className, animated = true, ...props }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        'rounded-md bg-skeleton-gradient bg-[length:200%_100%]', // uses Tailwind extended bg
        animated ? 'animate-shimmer' : '',
        className
      )}
      {...props}
    />
  )
}
