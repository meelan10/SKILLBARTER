import clsx from "clsx";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl border border-gray-200 shadow-sm p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}