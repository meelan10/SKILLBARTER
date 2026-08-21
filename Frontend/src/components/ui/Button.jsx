export default function Button({ variant = "primary", className = "", ...props }) {
  const styles = variant === "secondary"
    ? "bg-white border border-border text-text hover:bg-page"
    : variant === "ghost"
      ? "text-muted hover:text-text"
      : variant === "danger"
        ? "bg-red text-white hover:brightness-95"
      : "bg-teal-dark text-white hover:brightness-95";
  return <button className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${styles} ${className}`} {...props} />;
}
