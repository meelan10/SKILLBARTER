export default function Avatar({ name = "User", size = 40 }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <div style={{ width: size, height: size }} className="shrink-0 rounded-full bg-teal-soft text-teal-dark flex items-center justify-center text-xs font-bold">{initials}</div>;
}
