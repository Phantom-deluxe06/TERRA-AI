import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "narrow" | "wide" | "full";
}

export function Container({
    children,
    className,
    variant = "default",
    ...props
}: ContainerProps) {
    const variants = {
        default: "max-w-7xl",
        narrow: "max-w-3xl",
        wide: "max-w-[1400px]",
        full: "max-w-full",
    };

    return (
        <div
            className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", variants[variant], className)}
            {...props}
        >
            {children}
        </div>
    );
}
