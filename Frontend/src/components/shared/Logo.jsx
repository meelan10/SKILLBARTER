export default function Logo({ size = 28, showText = true, textSize = "text-2xl" }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10a8 8 0 0 1 13.6-5.7L20 6"
          stroke="#0F9D6F"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20 6V3M20 6h-3"
          stroke="#0F9D6F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 14a8 8 0 0 1-13.6 5.7L4 18"
          stroke="#E8622C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M4 18v3M4 18h3"
          stroke="#E8622C"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className={`font-bold tracking-tight ${textSize}`}>
          <span className="text-teal">Skill</span>
          <span className="text-text">Barter</span>
        </span>
      )}
    </div>
  );
}
