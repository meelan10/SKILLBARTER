export default function Badge({ color = "brand", children }) {
  const colors = { brand: "bg-brand-soft text-brand", teal: "bg-teal-soft text-teal-dark", amber: "bg-amber-soft text-amber", red: "bg-red-soft text-red" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${colors[color] || colors.brand}`}>{children}</span>;
}
