import clsx from "clsx";

const colors = {
  gray: "bg-page text-muted",
  brand: "bg-brand-soft text-brand",
  teal: "bg-teal-soft text-teal",
  amber: "bg-amber-soft text-amber",
  red: "bg-red-soft text-red",
};

export default function Badge({ children, color = "gray", className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
