export default function ProgressBar({ value, max = 100, color = "brand" }) {
  const pct = Math.min(100, (value / max) * 100);
  const colors = {
    brand: "bg-brand",
    teal: "bg-teal",
    amber: "bg-amber",
  };

  return (
    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
      <div
        className={`h-full ${colors[color]} rounded-full`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
