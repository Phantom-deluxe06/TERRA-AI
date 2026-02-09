import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-none border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-wider transition-colors focus:outline-none shadow-[2px_2px_0_#000]",
    {
        variants: {
            variant: {
                default: "bg-neo-lime text-black",
                secondary: "bg-neo-pink text-black",
                success: "bg-neo-mint text-black",
                warning: "bg-neo-yellow text-black",
                error: "bg-neo-orange text-black",
                purple: "bg-neo-purple text-black",
                outline: "bg-white text-black",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
