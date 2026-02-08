import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-green disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary: "bg-eco-gradient text-white hover:scale-[1.02] hover:shadow-glow-green",
                secondary: "bg-slate-800 text-white hover:bg-slate-700",
                outline: "border border-earth-green/30 bg-transparent text-earth-green hover:bg-earth-green/10",
                ghost: "bg-transparent hover:bg-slate-800 text-white",
                error: "bg-error text-white hover:bg-error/90",
            },
            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 text-base",
                lg: "h-12 px-8 text-lg font-semibold",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && children}
                {isLoading && "Loading..."}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
