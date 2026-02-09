import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-none font-bold transition-all border-2 border-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary: "bg-neo-lime text-black shadow-brutal hover:bg-neo-lime/90",
                secondary: "bg-neo-pink text-black shadow-brutal hover:bg-neo-pink/90",
                outline: "bg-white text-black shadow-brutal hover:bg-slate-50",
                ghost: "border-transparent bg-transparent hover:bg-black/5 text-black",
                error: "bg-neo-orange text-black shadow-brutal hover:bg-neo-orange/90",
                purple: "bg-neo-purple text-black shadow-brutal hover:bg-neo-purple/90",
            },
            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-11 px-6 text-base",
                lg: "h-14 px-10 text-xl uppercase tracking-wider",
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
