import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-earth-green focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-earth-green text-white",
                secondary: "bg-slate-800 text-white",
                success: "bg-green-500/20 text-green-500 border border-green-500/20",
                warning: "bg-amber-500/20 text-amber-500 border border-amber-500/20",
                error: "bg-red-500/20 text-red-500 border border-red-500/20",
                outline: "text-white border border-slate-800",
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
