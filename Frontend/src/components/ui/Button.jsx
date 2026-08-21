import clsx from "clsx";

const variants = {
  primary: "bg-ink text-white hover:bg-ink/90",
  secondary: "bg-white border border-border text-text hover:bg-page",
  brand: "bg-brand text-white hover:brightness-110",
  danger: "bg-red text-white hover:brightness-110",
  ghost: "bg-transparent text-muted hover:bg-page",
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        "px-4 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
